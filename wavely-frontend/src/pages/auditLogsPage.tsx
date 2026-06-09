import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function AuditLogsPage() {

  const [logs, setLogs] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {

    const getLogs = async () => {

      try {

        const token =
          localStorage.getItem('token');

        const response = await api.get(
          '/audits',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setLogs(response.data);

      } catch (error) {

        console.log(error);

      }
    };

    getLogs();

  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '50px',
        color: 'white'
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
          fontSize:'80px',
          color:'#f472d0'
        }}
      >
        📋 Audit Logs
      </h1>

      {logs.map((log) => (

        <div
          key={log.id}
          className="y2k-card"
          style={{
            padding:'20px',
            marginTop:'15px'
          }}
        >
          {log.action}
        </div>

      ))}
    </div>
  );
}

export default AuditLogsPage;