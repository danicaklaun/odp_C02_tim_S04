import { useNavigate } from 'react-router-dom';
import bg2 from '../assets/bg2.webp';


function HomePage() {

  const navigate = useNavigate();
  const role =
  localStorage.getItem('role');

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
      url(${bg2})
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
      <h1 className="page-title"  style={{
    fontFamily: 'AudioNugget',
    fontSize: '110px',
    lineHeight: '1',
    color: '#f472d0',
    marginBottom: '20px',
    textShadow: '0 0 20px rgba(244,114,208,0.5)'
  }}>
        ✨ Wavely ✨
      </h1>

      <p className="page-subtitle">
        Welcome back
      </p>

      <div
        style={{
          display:'grid',
          gridTemplateColumns:'repeat(2,320px)',
          gap:'30px'
        }}
      >
{role === 'admin' && (

  <div
    className="y2k-card"
    onClick={() => navigate('/admin')}
    style={{
      padding: '30px',
      cursor: 'pointer'
    }}
  >
    ⭐ Admin Dashboard
  </div>

)}
        <div
          className="y2k-card"
          onClick={() => navigate('/playlists')}
          style={{
            padding:'35px',
            borderRadius:'25px'
          }}
        >
          🎵 My Playlists
        </div>

        <div
          className="y2k-card"
          onClick={() => navigate('/library')}
          style={{
            padding:'35px',
            borderRadius:'25px'
          }}
        >
          💿 My Library
        </div>

        <div
          className="y2k-card"
          onClick={() => navigate('/following')}
          style={{
            padding:'35px',
            borderRadius:'25px'
          }}
        >
          🎤 Following Artists
        </div>

<div
  onClick={() => navigate('/tracks')}
  style={{
    background:'#1f2937',
    padding:'30px',
    borderRadius:'20px',
    cursor:'pointer'
  }}
>
  🎶 All Tracks
</div>
<div
  className="y2k-card"
  onClick={() => navigate('/artists')}
  style={{
    padding:'35px',
    borderRadius:'25px'
  }}
>
  🎤 Artists
</div>
        <div
          onClick={() => {
localStorage.removeItem('token');
localStorage.removeItem('role');
localStorage.removeItem('username');           navigate('/');
          }}
          style={{
            background:'#ff2d55',
            padding:'35px',
            borderRadius:'25px',
            cursor:'pointer',
            boxShadow:'0 0 25px rgba(255,45,85,.5)'
          }}
        >
          🚪 Logout
        </div>

      </div>
    </div>
    </div>
  );
}

export default HomePage;