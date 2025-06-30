'use client';

import { useState } from 'react';
import axios from '../../../lib/axios'; // your axios instance
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Both email and password are required.");
      return false;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post('/api/accounts/token/', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { access, refresh } = res.data;

      // Save tokens in sessionStorage
      sessionStorage.setItem('accessToken', access);
      sessionStorage.setItem('refreshToken', refresh);

      toast.success('Login successful');
      setFormData({ email: '', password: '' });
      router.push('/');
    } catch (err) {
      const error = err.response?.data;
      const message = error?.detail || error?.non_field_errors?.[0] || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
      {/* <h2 className="text-xl font-bold text-center">Login</h2> */}

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

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded w-full disabled:opacity-60"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
