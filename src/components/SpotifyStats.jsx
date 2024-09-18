import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { initiateSpotifyAuth, fetchRecentTracks } from '../utils/spotifyAuth';
import { toast } from "@/components/ui/use-toast";

const SpotifyStats = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('spotify_access_token'));

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('spotify_access_token', accessToken);
    }
  }, [accessToken]);

  const { data: recentTracks, isLoading, error, refetch } = useQuery({
    queryKey: ['recentTracks', accessToken],
    queryFn: () => fetchRecentTracks(accessToken),
    enabled: !!accessToken,
    onError: (error) => {
      toast({
        title: "Error fetching tracks",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAuth = async () => {
    try {
      await initiateSpotifyAuth();
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    setAccessToken(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out of Spotify.",
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Spotify Recent Tracks</h2>
      {!accessToken ? (
        <Button onClick={handleAuth}>Connect to Spotify</Button>
      ) : (
        <>
          <Button onClick={handleLogout} className="mb-4">Logout</Button>
          <Button onClick={() => refetch()} className="ml-2 mb-4">Refresh Data</Button>
          {isLoading ? (
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
        </>
      )}
    </div>
  );
};

export default SpotifyStats;
