import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient';

export default function SetNewPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Suspense fallback={<p>Loading...</p>}>
        <ResetPasswordClient />
      </Suspense>
    </main>
  );
}
