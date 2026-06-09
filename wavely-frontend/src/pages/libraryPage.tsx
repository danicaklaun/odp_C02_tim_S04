import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import bg3 from '../assets/bg3.webp';


function LibraryPage() {

  const [tracks, setTracks] = useState<any[]>([]);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const navigate = useNavigate();

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

        console.log('TOKEN', localStorage.getItem('token'));
console.log('DATA', response.data);
        setTracks(response.data);

      } catch (error) {

        console.log(error);

      }
    };


    getLibrary();
    getPlaylists();

  }, [])
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

const addToPlaylist = async (
  playlistId: number,
  trackId: number
) => {

  try {

    const token = localStorage.getItem('token');

    await api.post(
      `/playlists/${playlistId}/tracks`,
      {
        trackId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert('Added to playlist');

  } catch (error) {

    console.log(error);

    alert('Already exists');

  }
};

const removeTrack = async (trackId: number) => {

  try {

    const token = localStorage.getItem('token');

    await api.delete(
      `/library/${trackId}`,
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
        minHeight: '100vh',
        color: 'white',
        padding: '40px'
      }}
    >
        <button
  onClick={() => navigate('/home')}
  style={{
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer'
  }}
>
  🏠 Home
</button>
     <h1
  style={{
    fontFamily: 'AudioNugget',
    fontSize: '90px',
    color: '#f472d0',
    marginBottom: '10px'
  }}
>
  💿 My Library
</h1>
<p>Broj pesama: {tracks.length}</p>
      {tracks.map((track) => (

       <div
  className="y2k-card"
  key={track.id}
  style={{
    padding: '20px',
    borderRadius: '15px',
    marginTop: '15px'
  }}
>
  <h3>{track.title}</h3>

  <div
    style={{
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      marginTop: '10px'
    }}
  >
    {playlists.map((playlist) => (

      <button
        key={playlist.id}
        onClick={() =>
          addToPlaylist(
            playlist.id,
            track.id
          )
        }
        style={{
          background: '#f472d0',
          border: 'none',
          color: 'white',
          padding: '8px 15px',
          borderRadius: '10px',
          cursor: 'pointer'
        }}
      >
        ➕ {playlist.name}
      </button>

    ))}

    <button
  onClick={() => removeTrack(track.id)}
  style={{
    background: '#dc2626',
    border: 'none',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '10px',
    cursor: 'pointer'
  }}
>
  ❌ Remove
</button>
  </div>
</div>

      ))}
    </div>
    </div>
  );
}

export default LibraryPage;