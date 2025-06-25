'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from '../../../lib/axios';
import { MapPin, Star } from 'lucide-react';
import Link from 'next/link';


export default function DestinationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [destination, setDestination] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageUrls = destination?.images?.map((img) => img.image) || [];
  const imageCount = imageUrls.length;
  const displayedImage = imageUrls[currentIndex];

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`/api/tours/destinations/${id}/`);
        setDestination(response.data);
      } catch (error) {
        console.error('Failed to fetch destination:', error);
      }
    };

    if (id) fetchDestination();
  }, [id]);

  useEffect(() => {
    if (imageCount > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % imageCount);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [imageCount]);

  if (!destination) return <div className="text-center py-12">Loading...</div>;

  const {
    name,
    description,
    price,
    location,
    location_url,
    rating,
    facilities = [],
    categories = [],
  } = destination;

  const filledStars = Math.floor(parseFloat(rating || 0));
  const emptyStars = 5 - filledStars;

  const handleBooking = () => {
    router.push(`/booking/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 pb-20">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>

      {/* Image Carousel */}
      <div className="h-96 w-full rounded-xl overflow-hidden bg-gray-100 relative mb-6">
        <img
          src={displayedImage}
          alt={name}
          className="w-full h-full object-cover"
        />
        {imageCount > 1 && (
          <div className="absolute bottom-2 right-2 flex gap-1">
            {imageUrls.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentIndex ? 'bg-white' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="space-y-3 text-sm text-gray-700">
        <div>
          <strong>Price:</strong> PKR {parseFloat(price).toLocaleString()}
        </div>
        <div className="flex items-center">
          <MapPin size={18} className="text-blue-500 mr-2" />
          <a
            href={location_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {location}
          </a>
        </div>

        {/* Rating */}
        <div className="flex items-center text-yellow-500">
          {[...Array(filledStars)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={i} size={16} stroke="currentColor" />
          ))}
        </div>

        {/* Facilities */}
        <div className="flex flex-wrap gap-2 mt-2">
          {facilities.map((f, i) => (
            <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">
              {f.name}
            </span>
          ))}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mt-1">
          {categories.map((c, i) => (
            <span
              key={i}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
            >
              {c.name}
            </span>
          ))}
        </div>

        {/* Book Now Button - inside at the end */}
        <div className="pt-6">
          <Link
            href={`/destinations/${id}/book`}
           className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm font-semibold rounded shadow transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
