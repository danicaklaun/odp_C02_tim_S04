import { useNavigate } from 'react-router-dom';

function AdminPage() {

  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight:'100vh',
        padding:'50px',
        color:'white'
      }}
    >
      <button
        onClick={() => navigate('/home')}
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
        ⭐ Admin Dashboard
      </h1>

      <div className="y2k-card">
        👥 Users
      </div>

      <div className="y2k-card">
        🎤 Artists
      </div>

      <div className="y2k-card">
        🎵 Tracks
      </div>

      <div className="y2k-card">
        📋 Audit Logs
      </div>
    </div>
  );
}

export default AdminPage;