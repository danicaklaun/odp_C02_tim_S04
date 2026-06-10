import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AdminPage() {

  const navigate = useNavigate();

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {

    const getStats = async () => {

      try {

        const token =
          localStorage.getItem('token');

        const response =
          await api.get(
            '/admin/stats',
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setStats(response.data);

      } catch (error) {

        console.log(error);

      }
    };

    getStats();

  }, []);

  if (!stats) {
    return <h1>Loading...</h1>;
  }

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

      <div
        className="y2k-card"
        style={{
          padding:'20px',
          marginTop:'20px'
        }}
      >
        👥 Users: {stats.users}
      </div>

      <div
        className="y2k-card"
        style={{
          padding:'20px',
          marginTop:'20px'
        }}
      >
        🎤 Artists: {stats.artists}
      </div>

      <div
        className="y2k-card"
        style={{
          padding:'20px',
          marginTop:'20px'
        }}
      >
        🎵 Tracks: {stats.tracks}
      </div>

      <div
        className="y2k-card"
        style={{
          padding:'20px',
          marginTop:'20px'
        }}
      >
        📁 Playlists: {stats.playlists}
      </div>

      <div
        className="y2k-card"
        style={{
          padding:'20px',
          marginTop:'20px',
          cursor:'pointer'
        }}
        onClick={() => navigate('/users')}
      >
        👥 Manage Users
      </div>

      <div
        className="y2k-card"
        style={{
          padding:'20px',
          marginTop:'20px',
          cursor:'pointer'
        }}
        onClick={() => navigate('/audits')}
      >
        📋 Audit Logs
      </div>

    </div>
  );
}

export default AdminPage;