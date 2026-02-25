import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, Facebook, Linkedin, Youtube } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-emerald-500" />
              <div>
                <span className="font-bold text-xl text-white">SPML</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Secure Property Management Limited - Your trusted partner for premium real estate investments in Bangladesh.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-sm hover:text-emerald-500 transition-colors">
                  Our Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-emerald-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-emerald-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/investor/dashboard" className="text-sm hover:text-emerald-500 transition-colors">
                  Investor Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-semibold text-white mb-4">Our Projects</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties/bashundhara" className="text-sm hover:text-emerald-500 transition-colors">
                  Bashundhara Residences
                </Link>
              </li>
              <li>
                <Link href="/properties/purbachal" className="text-sm hover:text-emerald-500 transition-colors">
                  Purbachal Model Town
                </Link>
              </li>
              <li>
                <Link href="/properties/secure-green" className="text-sm hover:text-emerald-500 transition-colors">
                  Secure Green City
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span className="text-sm">
                  House 42, Road 12, Block E<br />
                  Bashundhara R/A, Dhaka 1229
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500" />
                <span className="text-sm">+880 171 326 7356</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500" />
                <span className="text-sm">info@spml.com.bd</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Secure Property Management Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-emerald-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-emerald-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
