
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserProfile {
  id: number;
  username: string;
  created_at: string;
}

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/users/${username}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to load profile.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  if (!profile) {
    return <div>User not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{profile.username}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Member since: {new Date(profile.created_at).toLocaleDateString()}
          </p>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
            <p className="text-muted-foreground">
              No blog posts yet. Check back later!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
