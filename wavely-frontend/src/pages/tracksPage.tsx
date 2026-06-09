import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import bg3 from '../assets/bg3.webp';

function TracksPage() {

  const [tracks, setTracks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {

    const getTracks = async () => {

      try {

        const response = await api.get('/tracks');

        setTracks(response.data);

      } catch (error) {

        console.log(error);

      }
    };

    getTracks();

  }, []);

  const saveTrack = async (trackId: number) => {

    try {

      const token = localStorage.getItem('token');

      await api.post(
        `/library/${trackId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Song saved to library');

    } catch (error) {

      console.log(error);

      alert('Already saved');

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
        backgroundPosition:'center'
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
          onClick={() => navigate('/home')}
          style={{
            padding:'10px',
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
            color:'#f472d0'
          }}
        >
          🎶 All Tracks
        </h1>

        {tracks.map((track) => (

          <div
            key={track.id}
            className="y2k-card"
            style={{
              padding:'20px',
              marginTop:'15px',
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center'
            }}
          >
            <span>{track.title}</span>

            <button
              onClick={() => saveTrack(track.id)}
              style={{
                background:'#f472d0',
                border:'none',
                color:'white',
                padding:'10px 15px',
                borderRadius:'10px',
                cursor:'pointer'
              }}
            >
              ❤️ Save
            </button>

          </div>

        ))}

      </div>
    </div>
  );
}

export default TracksPage;