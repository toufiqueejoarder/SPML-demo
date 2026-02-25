'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import {
  Project,
  Investor,
  Lead,
  ResaleListing,
  RentalUnit,
  SupportTicket,
  initialProjects,
  initialInvestors,
  initialLeads,
  initialResaleListings,
  initialRentalUnits,
  initialSupportTickets,
  Installment,
} from '@/lib/demo-data';

// Types
export type UserRole = 'public' | 'investor' | 'admin';
export type PaymentStatus = 'all_paid' | 'upcoming' | 'overdue';
export type DemandLevel = 'normal' | 'high';
export type LeadDistribution = 'balanced' | 'hot_heavy' | 'cold_heavy';

interface DemoSettings {
  currentRole: UserRole;
  currentInvestorId: string;
  paymentStatus: PaymentStatus;
  demandLevel: DemandLevel;
  leadDistribution: LeadDistribution;
  showDemoIndicator: boolean;
}

interface DemoState {
  projects: Project[];
  investors: Investor[];
  leads: Lead[];
  resaleListings: ResaleListing[];
  rentalUnits: RentalUnit[];
  supportTickets: SupportTicket[];
  settings: DemoSettings;
}

type DemoAction =
  | { type: 'SET_ROLE'; payload: UserRole }
  | { type: 'SET_INVESTOR'; payload: string }
  | { type: 'SET_PAYMENT_STATUS'; payload: PaymentStatus }
  | { type: 'SET_DEMAND_LEVEL'; payload: DemandLevel }
  | { type: 'SET_LEAD_DISTRIBUTION'; payload: LeadDistribution }
  | { type: 'TOGGLE_DEMO_INDICATOR' }
  | { type: 'SIMULATE_PAYMENT'; payload: { investorId: string; installmentId: string } }
  | { type: 'MARK_OVERDUE'; payload: { investorId: string; installmentId: string } }
  | { type: 'ADD_LEAD'; payload: Partial<Lead> }
  | { type: 'ADVANCE_MILESTONE'; payload: { projectId: string } }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'UPDATE_INVESTOR'; payload: Investor }
  | { type: 'UPDATE_LEAD'; payload: Lead }
  | { type: 'RESET_ALL' }
  | { type: 'LOAD_STATE'; payload: DemoState };

const defaultSettings: DemoSettings = {
  currentRole: 'public',
  currentInvestorId: 'inv-001',
  paymentStatus: 'upcoming',
  demandLevel: 'normal',
  leadDistribution: 'balanced',
  showDemoIndicator: true,
};

const initialState: DemoState = {
  projects: initialProjects,
  investors: initialInvestors,
  leads: initialLeads,
  resaleListings: initialResaleListings,
  rentalUnits: initialRentalUnits,
  supportTickets: initialSupportTickets,
  settings: defaultSettings,
};

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'SET_ROLE':
      return {
        ...state,
        settings: { ...state.settings, currentRole: action.payload },
      };

    case 'SET_INVESTOR':
      return {
        ...state,
        settings: { ...state.settings, currentInvestorId: action.payload },
      };

    case 'SET_PAYMENT_STATUS': {
      const newInvestors = state.investors.map(investor => ({
        ...investor,
        properties: investor.properties.map(prop => ({
          ...prop,
          installments: prop.installments.map(inst => {
            if (inst.status === 'paid') return inst;
            if (action.payload === 'all_paid') {
              return { ...inst, status: 'paid' as const, paidDate: new Date().toISOString().split('T')[0] };
            }
            if (action.payload === 'overdue') {
              const dueDate = new Date(inst.dueDate);
              const today = new Date();
              if (dueDate < today) {
                return { ...inst, status: 'overdue' as const };
              }
            }
            return { ...inst, status: 'upcoming' as const };
          }),
        })),
      }));
      return {
        ...state,
        investors: newInvestors,
        settings: { ...state.settings, paymentStatus: action.payload },
      };
    }

    case 'SET_DEMAND_LEVEL': {
      const multiplier = action.payload === 'high' ? 0.3 : 0;
      const newProjects = state.projects.map(project => {
        const bookedIncrease = Math.floor(project.availableUnits * multiplier);
        return {
          ...project,
          bookedUnits: project.bookedUnits + bookedIncrease,
          availableUnits: project.availableUnits - bookedIncrease,
        };
      });
      return {
        ...state,
        projects: newProjects,
        settings: { ...state.settings, demandLevel: action.payload },
      };
    }

    case 'SET_LEAD_DISTRIBUTION': {
      let newLeads = [...state.leads];
      if (action.payload === 'hot_heavy') {
        newLeads = newLeads.map((lead, i) => ({
          ...lead,
          score: i < 15 ? 'hot' : i < 25 ? 'warm' : 'cold',
        }));
      } else if (action.payload === 'cold_heavy') {
        newLeads = newLeads.map((lead, i) => ({
          ...lead,
          score: i < 5 ? 'hot' : i < 10 ? 'warm' : 'cold',
        }));
      } else {
        newLeads = initialLeads;
      }
      return {
        ...state,
        leads: newLeads,
        settings: { ...state.settings, leadDistribution: action.payload },
      };
    }

    case 'TOGGLE_DEMO_INDICATOR':
      return {
        ...state,
        settings: { ...state.settings, showDemoIndicator: !state.settings.showDemoIndicator },
      };

    case 'SIMULATE_PAYMENT': {
      const newInvestors = state.investors.map(investor => {
        if (investor.id !== action.payload.investorId) return investor;
        return {
          ...investor,
          properties: investor.properties.map(prop => ({
            ...prop,
            installments: prop.installments.map(inst => {
              if (inst.id !== action.payload.installmentId) return inst;
              return {
                ...inst,
                status: 'paid' as const,
                paidDate: new Date().toISOString().split('T')[0],
              };
            }),
          })),
        };
      });
      return { ...state, investors: newInvestors };
    }

    case 'MARK_OVERDUE': {
      const newInvestors = state.investors.map(investor => {
        if (investor.id !== action.payload.investorId) return investor;
        return {
          ...investor,
          properties: investor.properties.map(prop => ({
            ...prop,
            installments: prop.installments.map(inst => {
              if (inst.id !== action.payload.installmentId) return inst;
              return { ...inst, status: 'overdue' as const, paidDate: undefined };
            }),
          })),
        };
      });
      return { ...state, investors: newInvestors };
    }

    case 'ADD_LEAD': {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        name: action.payload.name || 'New Lead',
        email: action.payload.email || 'new@email.com',
        phone: action.payload.phone || '+880 1700 000000',
        score: action.payload.score || 'warm',
        interestedProject: action.payload.interestedProject || 'purbachal',
        budget: action.payload.budget || 'Not specified',
        source: action.payload.source || 'Demo',
        assignedTo: action.payload.assignedTo || 'Sales Team A',
        createdAt: new Date().toISOString().split('T')[0],
        status: 'new',
        dripStage: 0,
      };
      return { ...state, leads: [newLead, ...state.leads] };
    }

    case 'ADVANCE_MILESTONE': {
      const newProjects = state.projects.map(project => {
        if (project.id !== action.payload.projectId) return project;
        const milestones = [...project.milestones];
        const inProgressIdx = milestones.findIndex(m => m.status === 'in_progress');
        if (inProgressIdx !== -1) {
          milestones[inProgressIdx] = {
            ...milestones[inProgressIdx],
            status: 'completed',
            completedDate: new Date().toISOString().split('T')[0],
          };
          if (inProgressIdx + 1 < milestones.length) {
            milestones[inProgressIdx + 1] = {
              ...milestones[inProgressIdx + 1],
              status: 'in_progress',
            };
          }
        }
        return { ...project, milestones };
      });
      return { ...state, projects: newProjects };
    }

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    case 'UPDATE_INVESTOR':
      return {
        ...state,
        investors: state.investors.map(i =>
          i.id === action.payload.id ? action.payload : i
        ),
      };

    case 'UPDATE_LEAD':
      return {
        ...state,
        leads: state.leads.map(l =>
          l.id === action.payload.id ? action.payload : l
        ),
      };

    case 'RESET_ALL':
      return initialState;

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
}

// Computed values
interface ComputedValues {
  totalUnits: number;
  totalSold: number;
  totalBooked: number;
  totalAvailable: number;
  totalCollected: number;
  totalPending: number;
  totalOverdue: number;
  hotLeads: number;
  warmLeads: number;
  coldLeads: number;
  currentInvestor: Investor | undefined;
  overdueInstallments: Array<{ investor: Investor; installment: Installment; property: { projectId: string; unitNumber: string } }>;
}

function computeValues(state: DemoState): ComputedValues {
  const totalUnits = state.projects.reduce((sum, p) => sum + p.totalUnits, 0);
  const totalSold = state.projects.reduce((sum, p) => sum + p.soldUnits, 0);
  const totalBooked = state.projects.reduce((sum, p) => sum + p.bookedUnits, 0);
  const totalAvailable = state.projects.reduce((sum, p) => sum + p.availableUnits, 0);

  let totalCollected = 0;
  let totalPending = 0;
  let totalOverdue = 0;
  const overdueInstallments: ComputedValues['overdueInstallments'] = [];

  state.investors.forEach(investor => {
    investor.properties.forEach(prop => {
      prop.installments.forEach(inst => {
        if (inst.status === 'paid') {
          totalCollected += inst.amount;
        } else if (inst.status === 'overdue') {
          totalOverdue += inst.amount;
          overdueInstallments.push({
            investor,
            installment: inst,
            property: { projectId: prop.projectId, unitNumber: prop.unitNumber },
          });
        } else {
          totalPending += inst.amount;
        }
      });
    });
  });

  const hotLeads = state.leads.filter(l => l.score === 'hot').length;
  const warmLeads = state.leads.filter(l => l.score === 'warm').length;
  const coldLeads = state.leads.filter(l => l.score === 'cold').length;

  const currentInvestor = state.investors.find(
    i => i.id === state.settings.currentInvestorId
  );

  return {
    totalUnits,
    totalSold,
    totalBooked,
    totalAvailable,
    totalCollected,
    totalPending,
    totalOverdue,
    hotLeads,
    warmLeads,
    coldLeads,
    currentInvestor,
    overdueInstallments,
  };
}

// Context
interface DemoContextValue {
  state: DemoState;
  computed: ComputedValues;
  dispatch: React.Dispatch<DemoAction>;
  setRole: (role: UserRole) => void;
  setInvestor: (investorId: string) => void;
  setPaymentStatus: (status: PaymentStatus) => void;
  setDemandLevel: (level: DemandLevel) => void;
  setLeadDistribution: (dist: LeadDistribution) => void;
  toggleDemoIndicator: () => void;
  simulatePayment: (investorId: string, installmentId: string) => void;
  markOverdue: (investorId: string, installmentId: string) => void;
  addLead: (lead: Partial<Lead>) => void;
  advanceMilestone: (projectId: string) => void;
  resetAll: () => void;
}

const DemoContext = createContext<DemoContextValue | undefined>(undefined);

const STORAGE_KEY = 'spml-demo-state';

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, initialState);
  const computed = computeValues(state);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch (e) {
        console.error('Failed to load demo state:', e);
      }
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value: DemoContextValue = {
    state,
    computed,
    dispatch,
    setRole: (role) => dispatch({ type: 'SET_ROLE', payload: role }),
    setInvestor: (investorId) => dispatch({ type: 'SET_INVESTOR', payload: investorId }),
    setPaymentStatus: (status) => dispatch({ type: 'SET_PAYMENT_STATUS', payload: status }),
    setDemandLevel: (level) => dispatch({ type: 'SET_DEMAND_LEVEL', payload: level }),
    setLeadDistribution: (dist) => dispatch({ type: 'SET_LEAD_DISTRIBUTION', payload: dist }),
    toggleDemoIndicator: () => dispatch({ type: 'TOGGLE_DEMO_INDICATOR' }),
    simulatePayment: (investorId, installmentId) =>
      dispatch({ type: 'SIMULATE_PAYMENT', payload: { investorId, installmentId } }),
    markOverdue: (investorId, installmentId) =>
      dispatch({ type: 'MARK_OVERDUE', payload: { investorId, installmentId } }),
    addLead: (lead) => dispatch({ type: 'ADD_LEAD', payload: lead }),
    advanceMilestone: (projectId) =>
      dispatch({ type: 'ADVANCE_MILESTONE', payload: { projectId } }),
    resetAll: () => dispatch({ type: 'RESET_ALL' }),
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemoState() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoState must be used within a DemoStateProvider');
  }
  return context;
}

export function useCurrentInvestor() {
  const { computed } = useDemoState();
  return computed.currentInvestor;
}

export function useProjects() {
  const { state } = useDemoState();
  return state.projects;
}

export function useLeads() {
  const { state } = useDemoState();
  return state.leads;
}

export function useSettings() {
  const { state } = useDemoState();
  return state.settings;
}
