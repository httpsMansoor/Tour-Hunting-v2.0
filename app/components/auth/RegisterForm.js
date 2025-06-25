'use client';

import { useState } from 'react';
import axios from '../../../lib/axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/accounts/register/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success('Registration successful. You can now login.');
      router.push('/login');
    } catch (err) {
      const error = err.response?.data || 'Registration failed';
      toast.error(typeof error === 'string' ? error : JSON.stringify(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
      <h2 className="text-xl font-bold">Create Account</h2>

      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={formData.full_name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">
        Register
      </button>
    </form>
  );
}
