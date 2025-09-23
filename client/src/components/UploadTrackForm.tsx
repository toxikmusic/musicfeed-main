
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type Track } from './MusicFeed';

interface UploadTrackFormProps {
  onUploadSuccess: (track: Track) => void;
}

export default function UploadTrackForm({
  onUploadSuccess,
}: UploadTrackFormProps) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      setError('Please provide a title and select a file.');
      return;
    }
    setError('');
    setIsUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('track', file);

    try {
      const response = await fetch('/api/tracks/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newTrack = await response.json();
        onUploadSuccess(newTrack);
        setTitle('');
        setFile(null);
        // Reset file input
        const fileInput = document.getElementById('track-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to upload track.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload a new track</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Track Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your track title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="track-file">Audio File</Label>
            <Input
              id="track-file"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              required
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
