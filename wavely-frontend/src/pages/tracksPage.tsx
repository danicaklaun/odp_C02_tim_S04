import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import bg3 from '../assets/bg3.webp';

interface Track {
  id: number;
  title: string;
  artist_id: number;
  duration_sec: number;
  album: string;
  release_year: number;
}

function TracksPage() {

const [tracks, setTracks] =
  useState<Track[]>([]);  const navigate = useNavigate();
  const role = localStorage.getItem('role');
const token = localStorage.getItem('token');
const [title, setTitle] = useState('');
const [artistId, setArtistId] = useState('');
const [durationSec, setDurationSec] = useState('');
const [album, setAlbum] = useState('');
const [releaseYear, setReleaseYear] = useState('');
const [search, setSearch] = useState('');
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

 } catch {

  console.log('Error creating track');

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
const editTrack = async (
  track: Track
) => {

  try {

    const newTitle = prompt(
      'New title:',
      track.title
    );

    if (!newTitle) return;

    const token =
      localStorage.getItem('token');

    await api.put(
      `/tracks/${track.id}`,
      {
        title: newTitle,
        artist_id: track.artist_id,
        duration_sec: track.duration_sec,
        album: track.album,
        release_year: track.release_year
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
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

       {token && (
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
)}
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
<input
  placeholder="Search tracks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding:'12px',
    marginBottom:'20px',
    width:'300px',
    borderRadius:'10px'
  }}
/>
       {tracks
  .filter((track) =>
    track.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((track) => (
         <div
  key={track.id}
  className="y2k-card"
  onClick={() =>
    navigate(`/tracks/${track.id}`)
  }
  style={{
    padding:'20px',
    marginTop:'15px',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    cursor:'pointer'
  }}
>
            <span>{track.title}</span>

<div>

  <button
    onClick={(e) => {
      e.stopPropagation();
      saveTrack(track.id);
    }}
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
      onClick={(e) => {
        e.stopPropagation();
        editTrack(track);
      }}
      style={{
        marginLeft:'10px',
        background:'#3b82f6',
        border:'none',
        color:'white',
        padding:'10px 15px',
        borderRadius:'10px',
        cursor:'pointer'
      }}
    >
      ✏ Edit
    </button>

  )}

  {role === 'admin' && (

    <button
      onClick={(e) => {
        e.stopPropagation();
        deleteTrack(track.id);
      }}
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