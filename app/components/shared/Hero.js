'use client';

import { useState, useEffect } from "react";
import axios from "../../../lib/axios";

const TABS = ["PILGRIMAGE", "TRAVEL", "TOURS"];

export default function Hero({ onResults }) {
  const [activeTab, setActiveTab] = useState("PILGRIMAGE");

  // Filter state
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [ratingGte, setRatingGte] = useState("");
  const [ratingLte, setRatingLte] = useState("");
  const [facility, setFacility] = useState("");
  const [category, setCategory] = useState("");

  // Dropdown options
  const [facilityOptions, setFacilityOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  // Fetch all destinations to extract unique facility & category options
  useEffect(() => {
    axios.get("/api/tours/destinations/")
      .then(res => {
        const data = res.data;
        const facilities = new Set();
        const categories = new Set();

        data.forEach(dest => {
          dest.facilities.forEach(f => facilities.add(f.name));
          dest.categories.forEach(c => categories.add(c.name));
        });

        setFacilityOptions([...facilities]);
        setCategoryOptions([...categories]);
      })
      .catch(console.error);
  }, []);

  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (name) params.append("name__icontains", name);
    if (location) params.append("location__icontains", location);
    if (minPrice) params.append("price__gte", minPrice);
    if (maxPrice) params.append("price__lte", maxPrice);
    if (ratingGte) params.append("rating__gte", ratingGte);
    if (ratingLte) params.append("rating__lte", ratingLte);
    if (facility) params.append("facilities__name__icontains", facility);
    if (category) params.append("categories__name__icontains", category);

    try {
      const res = await axios.get(`/api/tours/destinations/?${params.toString()}`);
      if (onResults) onResults(res.data);
    } catch (err) {
      console.error("Filter request failed", err);
    }
  };

  return (
    <section
      className="relative w-full min-h-[500px] h-[calc(100vh-72px)] flex flex-col justify-center items-center bg-cover bg-center pt-24"
      style={{ backgroundImage: `url("/images/hero.jpg")` }}
    >
      <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
      <div className="relative z-20 text-white text-center max-w-5xl mx-auto w-full px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">A Life Changing Journey</h1>
        <p className="text-lg mb-6">Embark on a journey that touches your soul and changes your story.</p>
        <div className="flex justify-center space-x-4 mb-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === tab ? "bg-blue-600" : "bg-white text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter Inputs */}
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-800">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
          <input
            type="number"
            placeholder="Price Min"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
          <input
            type="number"
            placeholder="Price Max"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
          <input
            type="number"
            placeholder="Rating ≥"
            step="0.1"
            value={ratingGte}
            onChange={e => setRatingGte(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
          <input
            type="number"
            placeholder="Rating ≤"
            step="0.1"
            value={ratingLte}
            onChange={e => setRatingLte(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
          <select
            value={facility}
            onChange={e => setFacility(e.target.value)}
            className="p-2 border rounded-md w-full"
          >
            <option value="">Facility</option>
            {facilityOptions.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="p-2 border rounded-md w-full"
          >
            <option value="">Category</option>
            {categoryOptions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Search Destinations
          </button>
        </div>
      </div>
    </section>
  );
}
