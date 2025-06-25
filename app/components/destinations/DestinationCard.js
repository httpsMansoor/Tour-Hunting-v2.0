'use client';

import { useEffect, useState } from "react";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";

export default function DestinationCard({ destination }) {
  const {
    id,
    name,
    location,
    price,
    description,
    location_url,
    images = [],
    rating,
    facilities = [],
    categories = [],
  } = destination;

  // Image carousel logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageUrls = images.map(img => img.image);
  const imageCount = imageUrls.length;

  useEffect(() => {
    if (imageCount > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [imageCount]);

  const displayedImage = imageUrls[currentIndex];

  const filledStars = Math.floor(parseFloat(rating || 0));
  const emptyStars = 5 - filledStars;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      {/* Image Carousel */}
      <div className="h-52 w-full bg-gray-100 relative">
        <img
          src={displayedImage}
          alt={name}
          className="w-full h-full object-cover transition-all duration-500"
        />
        {imageCount > 1 && (
          <div className="absolute bottom-2 right-2 flex gap-1">
            {imageUrls.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Destination Info */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold truncate">{name}</h3>
          <span className="text-blue-600 font-bold text-sm">
            PKR {parseFloat(price).toLocaleString()}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {description?.slice(0, 80)}...
        </p>

        {/* Rating */}
        <div className="flex items-center text-yellow-500 text-sm">
          {[...Array(filledStars)].map((_, i) => (
            <Star key={`filled-${i}`} size={16} fill="currentColor" />
          ))}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={`empty-${i}`} size={16} stroke="currentColor" />
          ))}
        </div>

        {/* Facilities */}
        <div className="flex flex-wrap gap-1 mt-2">
          {facilities.map((f, i) => (
            <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
              {f.name}
            </span>
          ))}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {categories.map((c, i) => (
            <span
              key={i}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
            >
              {c.name}
            </span>
          ))}
        </div>

        {/* Location Link */}
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <MapPin size={16} className="mr-1 text-blue-500" />
          <a
            href={location_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline truncate"
          >
            {location}
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4">
          <Link
            href={`/destinations/${id}`}
            className="text-sm text-white bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700 transition"
          >
            View Details
          </Link>
          <Link
            href={`/destinations/${id}/book`}
            className="inline-block mt-2 text-sm text-white bg-green-600 px-4 py-1.5 rounded hover:bg-green-700 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
