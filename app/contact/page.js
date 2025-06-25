'use client';

import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="pt-28 pb-20 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto text-gray-800">
      {/* Page Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4 tracking-tight">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We'd love to hear from you! Reach out for bookings, support, or just to say hi.
        </p>
      </section>

      {/* Form and Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form className="bg-white shadow-lg p-8 rounded-xl space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={5}
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-8 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Visit Us</h3>
            <p className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-500" />
              Office #21, Tour Hunting Tower, Islamabad, Pakistan
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Call Us</h3>
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-blue-500" />
              +92 300 1234567
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Email</h3>
            <p className="flex items-center gap-2">
              <Mail size={18} className="text-blue-500" />
              support@tourhunting.com
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Business Hours</h3>
            <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </section>
    </main>
  );
}
