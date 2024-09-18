const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID';
const REDIRECT_URI = 'http://localhost:5173/callback';
const SCOPES = ['user-read-recently-played'];

export const initiateSpotifyAuth = () => {
  const authUrl = new URL('https://accounts.spotify.com/authorize');
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
  });
  authUrl.search = params.toString();
  window.location.href = authUrl.toString();
};

export const getAccessTokenFromHash = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get('access_token');
};

export const fetchRecentTracks = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch recent tracks');
  }
  const data = await response.json();
  return data.items.map(item => ({
    id: item.played_at,
    trackName: item.track.name,
    artist: item.track.artists.map(artist => artist.name).join(', '),
    playedAt: new Date(item.played_at).toLocaleString(),
  }));
};