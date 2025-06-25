'use client';

import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Hero from "./components/shared/Hero";
import DestinationCard from "./components/destinations/DestinationCard";
import Link from "next/link";

export default function HomePage() {
  const [destinations, setDestinations] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    if (token) {
      axios.get("/api/tours/destinations")
        .then(res => setDestinations(res.data))
        .catch(err => console.error("Failed to load destinations", err));
    }
  }, []);

  return (
    <>
      <main className="pt-20">
        {/* Hero with filter support */}
        <Hero onResults={setDestinations} />

        {/* Section */}
        <section className="p-8 max-w-7xl mx-auto">
          {!isLoggedIn ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                Sign Up or Login to make your journey beautiful
              </h2>
              <div className="space-x-4">
                <Link
                  href="/login"
                  className="text-sm px-4 py-2 border rounded-md text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                {destinations.length > 0 ? "Filtered Destinations" : "Popular Destinations"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {destinations.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
