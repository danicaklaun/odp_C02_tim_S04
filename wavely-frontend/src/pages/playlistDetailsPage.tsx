import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function PlaylistDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {

    const getPlaylistDetails = async () => {

      try {

        const token = localStorage.getItem('token');

        const response = await api.get(
          `/playlists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setTracks(response.data);

      } catch (error) {

        console.log(error);

      }
    };

    getPlaylistDetails();

  }, [id]);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '50px',
        color: 'white'
      }}
    >
      <button
        onClick={() => navigate('/playlists')}
        style={{
          padding: '10px',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ⬅ Back
      </button>

      <h1
        style={{
          fontFamily: 'AudioNugget',
          fontSize: '90px',
          color: '#f472d0'
        }}
      >
        Playlist Tracks
      </h1>

      {tracks.map((track) => (

        <div
          key={track.id}
          className="y2k-card"
          style={{
            padding: '20px',
            borderRadius: '15px',
            marginTop: '15px'
          }}
        >
          🎵 {track.title}
        </div>

      ))}

    </div>
  );
}

export default PlaylistDetailsPage;