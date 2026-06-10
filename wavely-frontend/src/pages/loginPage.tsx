import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import bgImage from '../assets/bg.jpeg';

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const response = await api.post(
        '/auth/login',
        {
          email,
          password
        }
      );

      localStorage.setItem(
        'token',
        response.data.token
      );

      localStorage.setItem(
        'role',
        response.data.role
      );

      localStorage.setItem(
        'username',
        response.data.username
      );

      navigate('/home');

    } catch {

      alert(
        'Invalid email or password'
      );

    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(8px)',
          background:
            'rgba(15,15,35,0.35)'
        }}
      />

      <div
        style={{
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <button
          onClick={() =>
            navigate('/tracks')
          }
          className="y2k-card"
          style={{
            padding: '20px',
            minWidth: '220px',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          🎵 Browse Tracks
        </button>

        <button
          onClick={() =>
            navigate('/artists')
          }
          className="y2k-card"
          style={{
            padding: '20px',
            minWidth: '220px',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          🎤 Browse Artists
        </button>
      </div>

      <div
        style={{
          zIndex: 1,
          width: '420px',
          padding: '40px',
          borderRadius: '30px',
          background:
            'rgba(20,20,40,0.65)',
          backdropFilter: 'blur(15px)',
          border:
            '1px solid rgba(255,255,255,0.15)',
          boxShadow:
            '0 0 40px rgba(255,105,180,0.35)',
          color: 'white',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            fontSize: '40px'
          }}
        >
          ✦
        </div>

        <h1
          style={{
            fontFamily: 'AudioNugget',
            fontSize: '110px',
            lineHeight: '1',
            color: '#f472d0',
            marginBottom: '20px',
            textShadow:
              '0 0 20px rgba(244,114,208,0.5)'
          }}
        >
          Wavely
        </h1>

        <p
          style={{
            color: '#fbcfe8',
            marginBottom: '30px',
            fontSize: '18px'
          }}
        >
          Welcome back
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: '100%',
            padding: '15px',
            marginBottom: '15px',
            borderRadius: '15px',
            border:
              '1px solid rgba(255,255,255,0.15)',
            background:
              'rgba(255,255,255,0.15)',
            color: 'white',
            fontSize: '16px',
            outline: 'none'
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: '100%',
            padding: '15px',
            marginBottom: '25px',
            borderRadius: '15px',
            border:
              '1px solid rgba(255,255,255,0.15)',
            background:
              'rgba(255,255,255,0.15)',
            color: 'white',
            fontSize: '16px',
            outline: 'none'
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '15px',
            border: 'none',
            borderRadius: '15px',
            background: '#ec4899',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow:
              '0 0 20px rgba(236,72,153,0.6)'
          }}
        >
          Login
        </button>

        <p
          style={{
            marginTop: '20px',
            cursor: 'pointer',
            color: '#fbcfe8'
          }}
          onClick={() =>
            navigate('/register')
          }
        >
          Don't have an account?
          {' '}
          Register
        </p>

      </div>
    </div>
  );
}

export default LoginPage;