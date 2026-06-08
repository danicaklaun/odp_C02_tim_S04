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

      navigate('/home');

    } catch {

      alert('Invalid email or password');

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
        alignItems: 'center'
      }}
    >
      <div
        style={{
          background: 'rgba(0,0,0,0.75)',
          padding: '40px',
          borderRadius: '20px',
          width: '350px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <h1
          style={{
            marginBottom: '25px',
            fontSize: '40px'
          }}
        >
          Wavely
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '10px',
            border: 'none'
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '10px',
            border: 'none'
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '12px',
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;