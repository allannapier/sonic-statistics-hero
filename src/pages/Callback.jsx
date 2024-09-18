import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../utils/spotifyAuth';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      getAccessToken(code)
        .then(token => {
          localStorage.setItem('spotify_access_token', token);
          navigate('/');
        })
        .catch(error => {
          console.error('Error getting access token:', error);
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <div>Processing authentication...</div>;
};

export default Callback;
