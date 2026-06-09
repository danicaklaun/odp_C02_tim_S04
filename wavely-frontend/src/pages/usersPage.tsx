import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function UsersPage() {

  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  const getUsers = async () => {

    try {

      const token =
        localStorage.getItem('token');

      const response = await api.get(
        '/users/all',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const changeRole = async (
    id: number,
    currentRole: string
  ) => {

    try {

      const token =
        localStorage.getItem('token');

      const newRole =
        currentRole === 'admin'
          ? 'listener'
          : 'admin';

      await api.put(
        `/users/${id}/role`,
        {
          role: newRole
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      getUsers();

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
        Back
      </button>

      <h1
        style={{
          fontFamily:'AudioNugget',
          fontSize:'90px',
          color:'#f472d0'
        }}
      >
        👥 Users
      </h1>

      {users.map((user) => (

        <div
          key={user.id}
          className="y2k-card"
          style={{
            padding:'20px',
            marginTop:'15px'
          }}
        >
          <h3>{user.username}</h3>

          <p>{user.email}</p>

          <p>
            Role: {user.role}
          </p>
          <p>
  Saved tracks: {user.saved_tracks}
</p>

          <button
            onClick={() =>
              changeRole(
                user.id,
                user.role
              )
            }
          >
            Change Role
          </button>
        </div>
        

      ))
      }
      
    </div>
  );
}

export default UsersPage;