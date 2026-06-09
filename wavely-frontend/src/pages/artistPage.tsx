import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import bg3 from '../assets/bg3.webp';

function ArtistsPage() {

  const [artists, setArtists] = useState<any[]>([]);

  const navigate = useNavigate();

  const role = localStorage.getItem('role');

  const getArtists = async () => {

    try {

      const response =
        await api.get('/artists');

      setArtists(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    getArtists();
  }, []);

  const editArtist = async (
    artist: any
  ) => {

    try {

      const newName =
        prompt(
          'New name:',
          artist.name
        );

      if (!newName) return;

      const token =
        localStorage.getItem('token');

      await api.put(
        `/artists/${artist.id}`,
        {
          name: newName,
          genre: artist.genre,
          country: artist.country,
          bio: artist.bio
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      getArtists();

    } catch (error) {

      console.log(error);

    }
  };

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
            onClick={() =>
              navigate(`/artists/${artist.id}`)
            }
            style={{
              cursor:'pointer',
              padding:'20px',
              borderRadius:'15px',
              marginTop:'15px'
            }}
          >
            <h3>{artist.name}</h3>

            {role === 'admin' && (

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  editArtist(artist);
                }}
                style={{
                  marginBottom:'10px',
                  padding:'8px 12px',
                  borderRadius:'8px',
                  border:'none',
                  cursor:'pointer'
                }}
              >
                ✏ Edit
              </button>

            )}

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