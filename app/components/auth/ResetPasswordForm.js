'use client'

import { useState } from 'react'
import axios from '../../../lib/axios'
import { toast } from 'react-toastify'

export default function ResetPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('/api/accounts/send-reset-password-link/', { email })
      toast.success('Reset link sent! Please check your email.')
      setEmail('')
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.email || 'Failed to send reset link.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
      <label className="block mb-2 text-sm font-medium text-gray-700">Email address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter your email"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>
    </form>
  )
}
