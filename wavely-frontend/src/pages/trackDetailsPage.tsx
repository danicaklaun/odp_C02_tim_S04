import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import bg3 from '../assets/bg3.webp';

function TrackDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [track, setTrack] = useState<any>(null);

  useEffect(() => {

    const getTrack = async () => {

      try {

        const response = await api.get(
          `/tracks/${id}`
        );

        setTrack(response.data);

      } catch (error) {

        console.log(error);

      }
    };

    getTrack();

  }, [id]);

  if (!track) {
    return <div>Loading...</div>;
  }

  const minutes =
    Math.floor(track.duration_sec / 60);

  const seconds =
    String(track.duration_sec % 60)
      .padStart(2, '0');

  return (
    <div
      style={{
        minHeight:'100vh',
        padding:'50px',
        backgroundImage: `
          linear-gradient(
            rgba(5,10,30,.55),
            rgba(5,10,30,.55)
          ),
          url(${bg3})
        `,
        backgroundSize:'cover'
      }}
    >
      <div
        className="y2k-card"
        style={{
          minHeight:'100vh',
          padding:'40px',
          color:'white'
        }}
      >

        <button
          onClick={() => navigate('/tracks')}
        >
          ⬅ Back
        </button>

        <h1
          style={{
            fontFamily:'AudioNugget',
            fontSize:'90px',
            color:'#f472d0'
          }}
        >
          🎵 {track.title}
        </h1>

        <p>Artist: {track.artist_name}</p>

        <p>Genre: {track.genre}</p>

        <p>Album: {track.album}</p>

        <p>
          Duration: {minutes}:{seconds}
        </p>

        <p>
          Release Year: {track.release_year}
        </p>

      </div>
    </div>
  );
}

export default TrackDetailsPage;