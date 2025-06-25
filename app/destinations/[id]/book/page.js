'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from '../../../../lib/axios';

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [dest, setDest] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/tours/destinations/${id}/`)
      .then(res => setDest(res.data))
      .catch(err => console.error('Failed to fetch destination:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/bookings/', {
        destination: dest.id,
        start_date: startDate,
        end_date: endDate,
        adults,
        children,
        babies
      });
      router.push('/bookings'); // Redirect to user's bookings
    } catch (err) {
      console.error(err);
      setError('Booking failed. Please check your input or try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!dest) return <div className="text-center py-20">Loading destination...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book: {dest.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Adults</label>
            <input
              type="number"
              min="1"
              max="10"
              value={adults}
              onChange={e => setAdults(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Children</label>
            <input
              type="number"
              min="0"
              max="10"
              value={children}
              onChange={e => setChildren(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Babies</label>
            <input
              type="number"
              min="0"
              max="5"
              value={babies}
              onChange={e => setBabies(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}
