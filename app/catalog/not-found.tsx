'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="container">
      <h1>404 - Page not found</h1>
      <p>You will be redirected to the homepage in a few seconds…</p>
    </div>
  );
};

export default NotFound;
