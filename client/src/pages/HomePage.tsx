
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MusicFeed from '@/components/MusicFeed';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Welcome back, {user?.username}!
      </h1>
      <MusicFeed />
    </div>
  );
}
