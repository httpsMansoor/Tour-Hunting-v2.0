'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from '../../../../lib/axios'; // adjust path if needed
import { toast } from 'react-toastify';

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const user_id = searchParams.get('user_id');
  const timestamp = searchParams.get('timestamp');
  const signature = searchParams.get('signature');

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!user_id || !timestamp || !signature) {
      toast.error('Invalid or missing reset parameters in URL');
      return;
    }

    try {
      setLoading(true);

      await axios.post('/api/accounts/reset-password/', {
        user_id: user_id.toString(),
        timestamp: parseInt(timestamp),
        signature,
        password,
      });

      toast.success('Password has been reset successfully!');
      router.push('/login');
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        'Password reset failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleResetPassword}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">Set New Password</h2>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );
}
