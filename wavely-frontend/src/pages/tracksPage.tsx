import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import bg3 from '../assets/bg3.webp';

function TracksPage() {

  const [tracks, setTracks] = useState<any[]>([]);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

const [title, setTitle] = useState('');
const [artistId, setArtistId] = useState('');
const [durationSec, setDurationSec] = useState('');
const [album, setAlbum] = useState('');
const [releaseYear, setReleaseYear] = useState('');
 useEffect(() => {
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
  const getTracks = async () => {

  try {

    const response = await api.get('/tracks');

    setTracks(response.data);

  } catch (error) {

    console.log(error);

  }
};

const createTrack = async () => {

  try {

    const token = localStorage.getItem('token');

    await api.post(
      '/tracks',
      {
        title,
        artist_id: Number(artistId),
        duration_sec: Number(durationSec),
        album,
        release_year: Number(releaseYear)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTitle('');
    setArtistId('');
    setDurationSec('');
    setAlbum('');
    setReleaseYear('');

    getTracks();

 } catch (error: any) {

  console.log('ERROR:', error);
  console.log('DATA:', error.response?.data);
  console.log('STATUS:', error.response?.status);

}
};

const deleteTrack = async (
  id: number
) => {

  try {

    const token = localStorage.getItem('token');

    await api.delete(
      `/tracks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    getTracks();

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
{role === 'admin' && (

  <div
    className="y2k-card"
    style={{
      padding:'20px',
      marginBottom:'30px',
      display:'flex',
      gap:'10px',
      flexWrap:'wrap'
    }}
  >
<input
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<input
  placeholder="Artist ID"
  value={artistId}
  onChange={(e) => setArtistId(e.target.value)}
/>
    <input
  placeholder="Duration (sec)"
  value={durationSec}
  onChange={(e) => setDurationSec(e.target.value)}
/>

<input
  placeholder="Album"
  value={album}
  onChange={(e) => setAlbum(e.target.value)}
/>

<input
  placeholder="Release Year"
  value={releaseYear}
  onChange={(e) => setReleaseYear(e.target.value)}
/>

    <button
      onClick={createTrack}
    >
      ➕ Add Track
    </button>

  </div>

)}
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

<div>

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
{role === 'admin' && (

  <button
    onClick={() =>
      deleteTrack(track.id)
    }
    style={{
      marginLeft:'10px',
      background:'#ff2d55',
      border:'none',
      color:'white',
      padding:'10px 15px',
      borderRadius:'10px',
      cursor:'pointer'
    }}
  >
    🗑 Delete
  </button>

)}
</div>
          </div>

        ))}

      </div>
    </div>
  );
}

export default TracksPage;