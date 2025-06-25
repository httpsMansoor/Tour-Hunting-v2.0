'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="pt-28 pb-20 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto text-gray-800">
      {/* Hero Title */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4 tracking-tight">
          Discover Tour Hunting
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Where your next unforgettable journey begins — tailored tours, spiritual retreats, and life-changing experiences.
        </p>
      </section>

      {/* Image & Story */}
      <section className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/hero.jpg"
            alt="Our Journey"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-5 text-justify">
          <h2 className="text-2xl font-bold text-blue-500">Our Story</h2>
          <p className="leading-relaxed">
            Tour Hunting began with a vision to connect people with the world in meaningful ways.
            What started as a small travel consultancy evolved into a trusted brand helping thousands
            find inspiration, serenity, and thrill across continents.
          </p>
          <p className="leading-relaxed">
            Our mission is to design journeys that resonate — whether you seek spiritual peace,
            cultural immersion, or thrilling adventure.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-10 mb-20">
        <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-md transition-all duration-300">
          <h3 className="text-xl font-semibold mb-3 text-blue-700">🌍 Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To make travel deeply personal, safe, and transformative — by empowering travelers to explore
            beyond boundaries and build lasting memories.
          </p>
        </div>
        <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-md transition-all duration-300">
          <h3 className="text-xl font-semibold mb-3 text-blue-700">🔭 Our Vision</h3>
          <p className="text-gray-700 leading-relaxed">
            To become a globally recognized platform for purposeful travel — celebrating diversity,
            sustainability, and human connection.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Start Your Journey With Us</h2>
        <p className="mb-6 text-gray-600">Explore a world of tailored tours and curated experiences.</p>
        <Link
          href="/destinations"
          className="inline-block px-6 py-3 bg-blue-600 text-white text-sm rounded-md font-medium shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
        >
          Browse Destinations
        </Link>
      </section>
    </main>
  );
}
