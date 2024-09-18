import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

const SpotifyStats = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateWithSpotify = () => {
    // TODO: Implement actual Spotify authentication
    console.log("Authenticating with Spotify...");
    setIsAuthenticated(true);
  };

  const fetchRecentTracks = async () => {
    // TODO: Replace with actual API call to Spotify
    return [
      { id: 1, trackName: "Song 1", artist: "Artist 1", playedAt: "2023-03-15 14:30" },
      { id: 2, trackName: "Song 2", artist: "Artist 2", playedAt: "2023-03-15 14:00" },
      { id: 3, trackName: "Song 3", artist: "Artist 3", playedAt: "2023-03-15 13:30" },
    ];
  };

  const { data: recentTracks, isLoading, error } = useQuery({
    queryKey: ['recentTracks'],
    queryFn: fetchRecentTracks,
    enabled: isAuthenticated,
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Spotify Recent Tracks</h2>
      {!isAuthenticated ? (
        <Button onClick={authenticateWithSpotify}>Authenticate with Spotify</Button>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Track Name</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Played At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTracks.map((track) => (
              <TableRow key={track.id}>
                <TableCell>{track.trackName}</TableCell>
                <TableCell>{track.artist}</TableCell>
                <TableCell>{track.playedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default SpotifyStats;