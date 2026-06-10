import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

interface Track {
  id: number;
  title: string;
  artist_id: number;
  duration_sec: number;
  album: string;
  release_year: number;
}

function PlaylistDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

const [tracks, setTracks] =
  useState<Track[]>([]);
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

  const removeTrack = async (
  trackId: number
) => {

  try {

    const token = localStorage.getItem('token');

    await api.delete(
      `/playlists/${id}/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTracks(
      tracks.filter(
        (track) => track.id !== trackId
      )
    );

  } catch (error) {

    console.log(error);

  }
};

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
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}
>
  <span>
    🎵 {track.title}
  </span>

  <button
    onClick={() =>
      removeTrack(track.id)
    }
    style={{
      background: '#dc2626',
      border: 'none',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '10px',
      cursor: 'pointer'
    }}
  >
    ❌ Remove
  </button>
</div>

      ))}

    </div>
  );
}

export default PlaylistDetailsPage;