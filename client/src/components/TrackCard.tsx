
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type Track } from './MusicFeed';
import { Link } from 'react-router-dom';

interface TrackCardProps {
  track: Track;
}

export default function TrackCard({ track }: TrackCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{track.title}</CardTitle>
        <CardDescription>
          Uploaded by{' '}
          <Link to={`/profile/${track.username}`} className="hover:underline font-medium">
            {track.username}
          </Link>{' '}
          on {new Date(track.created_at).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <audio controls className="w-full">
          <source src={track.file_path} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </CardContent>
    </Card>
  );
}
