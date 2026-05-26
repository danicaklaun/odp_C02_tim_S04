import { useState } from 'react';
import api from '../services/api';

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
    <div>

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}

export default LoginPage;