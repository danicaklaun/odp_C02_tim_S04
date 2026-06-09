import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import bgImage from '../assets/bg.jpeg';

function RegisterPage() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {

    try {

      await api.post(
        '/auth/register',
        {
          username,
          email,
          password
        }
      );

      alert('Registration successful');

      navigate('/');

    } catch (error) {

      console.log(error);

      alert('Registration failed');

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
          width: '520px',
          padding: '40px',
          borderRadius: '30px',
          background: 'rgba(20,20,40,0.65)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 0 40px rgba(255,105,180,0.35)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <h1
          style={{
            fontFamily: 'AudioNugget',
            fontSize: '90px',
            color: '#f472d0',
            marginBottom: '20px'
          }}
        >
          Wavely
        </h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '15px',
            marginBottom: '15px',
            borderRadius: '15px',
            border: 'none'
          }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '15px',
            marginBottom: '15px',
            borderRadius: '15px',
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
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '15px',
            border: 'none'
          }}
        />

        <button
          onClick={handleRegister}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '15px',
            border: 'none',
            background: '#ec4899',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Register
        </button>

        <p
          style={{
            marginTop: '20px',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          Already have an account? Login
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;