import SpotifyStats from '../components/SpotifyStats';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Spotify Listening Statistics</h1>
        <SpotifyStats />
      </div>
    </div>
  );
};

export default Index;
