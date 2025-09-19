
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to AudiusClone</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Discover, stream, and share a constantly expanding mix of music from
        emerging and major artists around the world.
      </p>
      <Button asChild size="lg">
        <Link to="/register">Get Started</Link>
      </Button>
    </div>
  );
}
