'use client';

import { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import Link from 'next/link';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('/api/booking/');
        setBookings(res.data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>

      {bookings.length === 0 ? (
        <p>You haven’t booked any destinations yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-semibold">{booking.destination?.name}</h3>
              <p><strong>Date:</strong> {booking.travel_date}</p>
              <p><strong>People:</strong> {booking.number_of_people}</p>
              <Link
                href={`/destinations/${booking.destination?.id}`}
                className="text-blue-600 hover:underline block mt-2"
              >
                View Destination
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
