import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import bg3 from '../assets/bg3.webp';

function ArtistsPage() {

  const [artists, setArtists] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {

    const getArtists = async () => {

      try {

        const response = await api.get('/artists');
                console.log(response.data);


        setArtists(response.data);

      } catch (error) {

        console.log(error);

      }
    };

    getArtists();

  }, []);

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

        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat'
      }}
    >
      <div
        className="y2k-card"
        style={{
          minHeight:'100vh',
          color:'white',
          padding:'40px'
        }}
      >
        <button
          onClick={() => navigate('/home')}
          style={{
            padding:'10px',
            marginBottom:'20px',
            borderRadius:'10px',
            border:'none',
            cursor:'pointer'
          }}
        >
          🏠 Home
        </button>

        <h1
          style={{
            fontFamily:'AudioNugget',
            fontSize:'90px',
            color:'#f472d0',
            marginBottom:'20px'
          }}
        >
          🎤 Artists
        </h1>

        <p>
          Number of artists: {artists.length}
        </p>

        {artists.map((artist) => (

          <div
            key={artist.id}
            className="y2k-card"
            style={{
              padding:'20px',
              borderRadius:'15px',
              marginTop:'15px'
            }}
          >
            <h3>{artist.name}</h3>

            {artist.genre && (
              <p>
                Genre: {artist.genre}
              </p>
            )}

            {artist.country && (
              <p>
                Country: {artist.country}
              </p>
            )}
          </div>

        ))}

      </div>
    </div>
  );
}

export default ArtistsPage;