import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../utils/spotifyAuth';
import { toast } from "@/components/ui/use-toast";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      console.error('Authorization error:', error);
      toast({
        title: "Authorization Error",
        description: `Spotify authorization failed: ${error}`,
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    if (code) {
      getAccessToken(code)
        .then(token => {
          localStorage.setItem('spotify_access_token', token);
          toast({
            title: "Authentication Successful",
            description: "You've been successfully connected to Spotify.",
          });
          navigate('/');
        })
        .catch(error => {
          console.error('Error getting access token:', error);
          toast({
            title: "Authentication Error",
            description: `Failed to get access token: ${error.message}`,
            variant: "destructive",
          });
          navigate('/');
        });
    } else {
      toast({
        title: "Authentication Error",
        description: "No authorization code received from Spotify.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [navigate]);

  return <div>Processing authentication...</div>;
};

export default Callback;
