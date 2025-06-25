'use client';

import { useState } from 'react';
import axios from '../../../lib/axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
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
      const res = await axios.post('/api/accounts/token/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { access, refresh } = res.data;
      sessionStorage.setItem('accessToken', access);
      sessionStorage.setItem('refreshToken', refresh);

      toast.success('Login successful');
      router.push('/destinations');
    } catch (err) {
      const error = err.response?.data || 'Login failed';
      toast.error(typeof error === 'string' ? error : JSON.stringify(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
      <h2 className="text-xl font-bold">Login</h2>

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
        Login
      </button>

      
    </form>
  );
}
