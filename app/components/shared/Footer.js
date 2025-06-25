'use client'

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Tour Hunting</h2>
          <p className="text-sm">
            Discover unforgettable destinations and book your dream journey with ease.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/destinations" className="hover:text-white">Destinations</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/bookings" className="hover:text-white">My Bookings</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Get in Touch</h3>
          <p className="flex items-center gap-2 text-sm"><Mail size={16} /> support@tourhunting.com</p>
          <p className="flex items-center gap-2 text-sm mt-1"><Phone size={16} /> +92 123 4567890</p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Tour Hunting. All rights reserved.
      </div>
    </footer>
  );
}
