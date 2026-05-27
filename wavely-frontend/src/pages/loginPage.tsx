import { useState } from 'react';
import api from '../services/api';

import bgImage from '../assets/bg.jpeg';

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    try {

      const response = await api.post(
        '/auth/login',
        {
          email,
          password
        }
      );

      console.log(response.data);

      alert('Login successful');

    } catch (error) {

      console.log(error);

      alert('Login failed');
    }
  };

  return (

    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >

      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '40px',
          borderRadius: '20px',
          width: '350px',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >

        <h1
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: '40px',
            fontWeight: 'bold'
          }}
        >
          Wavely
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            padding: '12px',
            borderRadius: '10px',
            border: 'none'
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
            padding: '12px',
            borderRadius: '10px',
            border: 'none'
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            padding: '12px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#7c3aed',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default LoginPage;