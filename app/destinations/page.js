// app/destinations/page.js
'use client';

import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import DestinationCard from "../components/destinations/DestinationCard";

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await axios.get("/api/tours/destinations/");
        setDestinations(res.data);
      } catch (error) {
        console.error("Failed to fetch destinations", error);
      }
    }

    fetchDestinations();
  }, []);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Destinations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </main>
  );
}
