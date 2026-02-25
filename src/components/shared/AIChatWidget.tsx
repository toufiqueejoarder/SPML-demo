'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSettings } from '@/contexts/DemoStateContext';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Sparkles,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestionButtons = [
  'Tell me about Bashundhara',
  'What are the payment options?',
  'How to visit a project site?',
  'NRB investment process',
];

const aiResponses: Record<string, string> = {
  'tell me about bashundhara': `Bashundhara Residences is our flagship project located in Bashundhara R/A, Dhaka. 

Key highlights:
• 50 total units, only 10 available
• Starting from ৳35,000/Katha
• Projected 100%+ ROI by 2030
• Premium amenities including 24/7 security, gated community, and wide roads

Would you like to schedule a site visit?`,

  'payment options': `We offer flexible payment options:

• 20% down payment, rest in 12-18 installments
• Bank financing available through partner banks
• NRB-friendly remittance options via bKash, Nagad
• EMI options available for local buyers

All payments are tracked in your investor portal with real-time ledger updates.`,

  'visit a project site': `We'd love to show you around! You can schedule a site visit by:

1. Calling us at +880 171 326 7356
2. Using the contact form on our website
3. WhatsApp for instant scheduling

Our team provides free guided tours every weekend. We can also arrange video tours for NRB investors.`,

  'nrb investment': `NRB (Non-Resident Bangladeshi) Investment Process:

1. KYC verification via online portal
2. Choose your property from our catalog
3. Secure with down payment via remittance
4. Complete documentation remotely
5. Access your digital document vault 24/7

We handle all local paperwork, and you can track everything through your investor portal.`,

  default: `Thank you for your question! I'm here to help with information about:

• Our property projects (Bashundhara, Purbachal, Secure Green)
• Investment opportunities and ROI projections
• Payment plans and financing options
• NRB investment process
• Site visits and documentation

What would you like to know more about?`,
};

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('bashundhara')) {
    return aiResponses['tell me about bashundhara'];
  }
  if (lowerMessage.includes('payment') || lowerMessage.includes('installment') || lowerMessage.includes('pay')) {
    return aiResponses['payment options'];
  }
  if (lowerMessage.includes('visit') || lowerMessage.includes('tour') || lowerMessage.includes('see')) {
    return aiResponses['visit a project site'];
  }
  if (lowerMessage.includes('nrb') || lowerMessage.includes('abroad') || lowerMessage.includes('overseas')) {
    return aiResponses['nrb investment'];
  }
  
  return aiResponses['default'];
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Assalamu Alaikum! 👋 Welcome to SPML. I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const settings = useSettings();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const message = text || inputValue;
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(message);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!settings.showDemoIndicator) return null;

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-40 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-4 z-40 w-[380px] h-[500px] shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">SPML Assistant</p>
                <div className="flex items-center gap-1 text-xs text-emerald-100">
                  <Sparkles className="w-3 h-3" />
                  AI Powered
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {suggestionButtons.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Demo AI - Responses are simulated
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
