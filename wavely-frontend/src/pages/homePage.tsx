import { useNavigate } from 'react-router-dom';

function HomePage() {

  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111827',
        color: 'white',
        padding: '40px'
      }}
    >
      <h1
        style={{
          fontSize: '48px',
          marginBottom: '10px'
        }}
      >
        Wavely
      </h1>

      <p
        style={{
          color: '#9ca3af',
          marginBottom: '40px'
        }}
      >
        Welcome back
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 250px)',
          gap: '20px'
        }}
      >
        <div
          onClick={() => navigate('/playlists')}
          style={{
            background: '#1f2937',
            padding: '30px',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          🎵 My Playlists
        </div>

        <div
          onClick={() => navigate('/library')}
          style={{
            background: '#1f2937',
            padding: '30px',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          📚 My Library
        </div>

        <div
          onClick={() => navigate('/following')}
          style={{
            background: '#1f2937',
            padding: '30px',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          🎤 Following Artists
        </div>

        <div
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
          style={{
            background: '#dc2626',
            padding: '30px',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          🚪 Logout
        </div>
      </div>
    </div>
  );
}

export default HomePage;