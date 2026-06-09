import {
  Routes,
  Route
} from 'react-router-dom';

import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import PlaylistsPage from './pages/playlistsPage';
import LibraryPage from './pages/libraryPage';
import FollowingPage from './pages/followingPage';
import PlaylistDetailsPage from './pages/PlaylistDetailsPage';

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<LoginPage />}
      />
<Route
  path="/home"
  element={<HomePage />}
/>
<Route
  path="/playlists"
  element={<PlaylistsPage />}
/>
<Route
  path="/library"
  element={<LibraryPage />}
/>
<Route
  path="/following"
  element={<FollowingPage />}
/>
<Route
  path="/playlists/:id"
  element={<PlaylistDetailsPage />}
/>
    </Routes>
  );
}

export default App;