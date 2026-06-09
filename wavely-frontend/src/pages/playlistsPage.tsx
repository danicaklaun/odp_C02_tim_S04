import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import bg3 from '../assets/bg3.webp';


function PlaylistsPage() {

  const [playlists, setPlaylists] = useState<any[]>([]);
  const [playlistName, setPlaylistName] = useState('');
  const navigate = useNavigate();

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

const createPlaylist = async () => {
  try {

    const token = localStorage.getItem('token');

    await api.post(
      '/playlists',
      {
        name: playlistName
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setPlaylistName('');
    getPlaylists();

  } catch (error) {
    console.log(error);
  }
};

const deletePlaylist = async (id: number) => {
  try {

    const token = localStorage.getItem('token');

    await api.delete(
      `/playlists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    getPlaylists();

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getPlaylists();
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
    margin: 0,
    textShadow: 'none'
  }}
>
  🎵 My Playlists
</h1>
<div
  style={{
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    marginBottom: '30px'
  }}
>
  <input
    value={playlistName}
    onChange={(e) => setPlaylistName(e.target.value)}
    placeholder="Playlist name..."
    style={{
      padding: '12px',
      borderRadius: '10px',
      border: 'none',
      width: '250px'
    }}
  />

  <button
    onClick={createPlaylist}
    style={{
      padding: '12px 20px',
      borderRadius: '10px',
      border: 'none',
      background: '#f472d0',
      color: 'white',
      cursor: 'pointer'
    }}
  >
    ➕ Create
  </button>
</div>

     {playlists.map((playlist) => (

  <div
    key={playlist.id}
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
    <div
  onClick={() =>
    navigate(`/playlists/${playlist.id}`)
  }
  style={{
    cursor: 'pointer',
    flex: 1
  }}
>
  {playlist.name}
</div>

    <button
      onClick={() => deletePlaylist(playlist.id)}
      style={{
        background: '#ff3b6f',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '10px',
        color: 'white',
        cursor: 'pointer'
      }}
    >
      🗑 Delete
    </button>

  </div>

))}
    </div>
    </div>
  );
}

export default PlaylistsPage;