import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import bg3 from '../assets/bg3.webp';

interface Artist {
  id: number;
  name: string;
  genre: string;
  country: string;
  bio: string;
}

interface Track {
  id: number;
  title: string;
  artist_id: number;
  duration_sec: number;
  album: string;
  release_year: number;
}

function ArtistDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();
  const [followers, setFollowers] = useState(0);

 const [artist, setArtist] =
  useState<Artist | null>(null);

const [tracks, setTracks] =
  useState<Track[]>([]);

  useEffect(() => {

    const getArtist = async () => {

      try {

        const response = await api.get(
          `/artists/${id}`
        );

        setArtist(response.data.artist);
setTracks(response.data.tracks);
setFollowers(response.data.followers);

      } catch (error) {

        console.log(error);

      }
    };

    getArtist();

  }, [id]);

  if (!artist) {
    return <div>Loading...</div>;
  }

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
          onClick={() => navigate('/artists')}
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
          🎤 {artist.name}
        </h1>
        

<p>
  👥 Followers: {followers}
</p>


        <p>
          Genre: {artist.genre}
        </p>

        <p>
          Country: {artist.country}
        </p>

        <p>
          {artist.bio}
        </p>

        <h2>
          Tracks
        </h2>

        {tracks.map((track) => (

          <div
            key={track.id}
            className="y2k-card"
            style={{
              padding:'20px',
              marginTop:'15px'
            }}
          >
            🎵 {track.title}
          </div>

        ))}

      </div>
    </div>
  );
}

export default ArtistDetailsPage;