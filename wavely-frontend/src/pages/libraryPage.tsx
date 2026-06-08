import { useEffect, useState } from 'react';
import api from '../services/api';

function LibraryPage() {

  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {

    const getLibrary = async () => {

      try {

        const token = localStorage.getItem('token');

        const response = await api.get(
          '/library',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log(response.data);
        setTracks(response.data);

      } catch (error) {

        console.log(error);

      }
    };

    getLibrary();

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
      <h1>My Library</h1>
<p>Broj pesama: {tracks.length}</p>
      {tracks.map((track) => (

        <div
          key={track.id}
          style={{
            background: '#1f2937',
            padding: '20px',
            borderRadius: '15px',
            marginTop: '15px'
          }}
        >
          {track.title}
        </div>

      ))}
    </div>
  );
}

export default LibraryPage;