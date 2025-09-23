
import React, { useState, useEffect } from 'react';
import UploadTrackForm from './UploadTrackForm';
import TrackCard from './TrackCard';

export interface Track {
  id: number;
  title: string;
  file_path: string;
  created_at: string;
  username: string;
}

export default function MusicFeed() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchTracks = async () => {
    try {
      const response = await fetch('/api/tracks/feed');
      if (response.ok) {
        const data = await response.json();
        setTracks(data);
      } else {
        setError('Failed to load music feed.');
      }
    } catch (err) {
      setError('An error occurred while fetching tracks.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleUploadSuccess = (newTrack: Track) => {
    setTracks([newTrack, ...tracks]);
  };

  if (isLoading) {
    return <div>Loading feed...</div>;
  }

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <UploadTrackForm onUploadSuccess={handleUploadSuccess} />
      <div className="space-y-4">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
        {tracks.length === 0 && (
          <p className="text-center text-muted-foreground">
            No tracks yet. Be the first to upload!
          </p>
        )}
      </div>
    </div>
  );
}
