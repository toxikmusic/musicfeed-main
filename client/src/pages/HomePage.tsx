
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Welcome back, {user?.username}!
      </h1>
      <p className="mt-4 text-muted-foreground">
        This is your dashboard. More features coming soon!
      </p>
    </div>
  );
}
