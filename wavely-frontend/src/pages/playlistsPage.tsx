import { useEffect, useState } from 'react';
import api from '../services/api';

function PlaylistsPage() {

  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {

    const getPlaylists = async () => {

      try {

        const token = localStorage.getItem('token');

        const response = await api.get(
          '/playlists',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setPlaylists(response.data);

      } catch (error) {
        console.log(error);
      }
    };

    getPlaylists();

  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111827',
        color: 'white',
        padding: '40px'
      }}
    >
      <h1>My Playlists</h1>

      {playlists.map((playlist) => (

        <div
          key={playlist.id}
          style={{
            background: '#1f2937',
            padding: '20px',
            borderRadius: '15px',
            marginTop: '15px'
          }}
        >
          {playlist.name}
        </div>

      ))}
    </div>
  );
}

export default PlaylistsPage;