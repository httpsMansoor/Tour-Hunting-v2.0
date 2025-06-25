'use client'

import { useEffect, useState } from 'react'
import axios from '../../lib/axios'
import { toast } from 'react-toastify'

export default function BookingsPage() {
  const [bookings, setBookings] = useState([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings/')
      setBookings(res.data)
    } catch (err) {
      console.error('Error fetching bookings', err)
    }
  }

  const handleConfirm = (id) => {
    setSelectedBookingId(id)
    setShowConfirmDialog(true)
  }

  const handleCancel = (id) => {
    setSelectedBookingId(id)
    setShowCancelDialog(true)
  }

  const confirmBooking = async () => {
    try {
      await axios.patch(`/api/bookings/${selectedBookingId}/`, { confirmed: true })
      setBookings(prev =>
        prev.map(booking =>
          booking.id === selectedBookingId ? { ...booking, confirmed: true } : booking
        )
      )
      toast.success('Booking confirmed!')
    } catch (err) {
      console.error('Failed to confirm booking', err)
      toast.error('Failed to confirm booking')
    } finally {
      setShowConfirmDialog(false)
      setSelectedBookingId(null)
    }
  }

  const cancelBooking = async () => {
    try {
      await axios.delete(`/api/bookings/${selectedBookingId}/`)
      setBookings(prev => prev.filter(booking => booking.id !== selectedBookingId))
      toast.success('Booking cancelled!')
    } catch (err) {
      console.error('Failed to cancel booking', err)
      toast.error('Failed to cancel booking')
    } finally {
      setShowCancelDialog(false)
      setSelectedBookingId(null)
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 min-h-[60vh]">
      {/* Add pt-28 to push content below the fixed navbar */}
      <h1 className="pt-10 text-3xl font-bold mb-6 text-center text-blue-700">Your Bookings</h1>

      {bookings.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500 text-center text-lg">You have no bookings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            const destination = booking.destination_details
            const imageUrl = destination?.images?.[0]?.image || '/images/hero.jpg'

            return (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={imageUrl}
                  alt={destination.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold text-blue-600">{destination.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{destination.description}</p>

                  <div className="text-sm text-gray-500 space-y-1">
                    <p><strong>Location:</strong> {destination.location}</p>
                    <p><strong>Travel Dates:</strong> {booking.start_date} → {booking.end_date}</p>
                    <p><strong>Guests:</strong> {booking.adults} adults, {booking.children} children, {booking.babies} babies</p>
                    <p><strong>Total:</strong> PKR {parseFloat(booking.total_price).toLocaleString()}</p>
                    <p className={booking.confirmed ? "text-green-600" : "text-yellow-500"}>
                      <strong>Status:</strong> {booking.confirmed ? "Confirmed" : "Pending"}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-4">
                    {!booking.confirmed && (
                      <button
                        onClick={() => handleConfirm(booking.id)}
                        className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Confirm Booking
                      </button>
                    )}
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="px-4 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Confirm Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-xl text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Booking</h2>
            <p className="text-sm text-gray-700 mb-4">Are you sure you want to confirm this booking?</p>
            <div className="flex justify-center gap-4">
              <button onClick={confirmBooking} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Yes, Confirm
              </button>
              <button onClick={() => setShowConfirmDialog(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-xl text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Cancel Booking</h2>
            <p className="text-sm text-gray-700 mb-4">Are you sure you want to cancel this booking?</p>
            <div className="flex justify-center gap-4">
              <button onClick={cancelBooking} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Yes, Cancel
              </button>
              <button onClick={() => setShowCancelDialog(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
