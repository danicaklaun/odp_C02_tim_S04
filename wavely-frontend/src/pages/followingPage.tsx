import { useNavigate } from 'react-router-dom';
import bg3 from '../assets/bg3.webp';


function FollowingPage() {

    const navigate = useNavigate();
  const artists = [
    {
      id: 1,
      name: 'The Weeknd'
    },
    {
      id: 2,
      name: 'Arctic Monkeys'
    },
    {
      id: 3,
      name: 'Imagine Dragons'
    }
  ];

  return (
     <div
  style={{
    minHeight:'100vh',
    padding:'50px',

    backgroundImage: `
      linear-gradient(
        rgba(5,10,30,.55),
        rgba(5,10,30,.55)
      ),
      url(${bg3})
    `,

    backgroundSize:'cover',
    backgroundPosition:'center',
    backgroundRepeat:'no-repeat'
    
  }}
>

    <div
    className="y2k-card"
      style={{
        minHeight: '100vh',
        color: 'white',
        padding: '40px'
      }}
    >
        <button
  onClick={() => navigate('/home')}
  style={{
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer'
  }}
>
  🏠 Home
</button>

     <h1
  style={{
    fontFamily: 'AudioNugget',
    fontSize: '90px',
    color: '#f472d0',
    marginBottom: '30px'
  }}
>
  🎤 Following Artists
</h1>

      {artists.map((artist) => (

        <div
        className="y2k-card"
          key={artist.id}
          style={{
            padding: '20px',
            borderRadius: '15px',
            marginTop: '15px'
          }}
        >
          {artist.name}
        </div>

      ))}
    </div>
    </div>
  );
}

export default FollowingPage;