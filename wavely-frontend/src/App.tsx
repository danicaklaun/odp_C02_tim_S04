import {
  Routes,
  Route
} from 'react-router-dom';

import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import PlaylistsPage from './pages/playlistsPage';
import LibraryPage from './pages/libraryPage';
import FollowingPage from './pages/followingPage';
import PlaylistDetailsPage from './pages/playlistDetailsPage';
import TracksPage from './pages/tracksPage';
import RegisterPage from './pages/registerPage';
import ArtistsPage from './pages/artistPage';
import AdminPage from './pages/adminPage';
import AuditLogsPage from './pages/auditLogsPage';
import UsersPage from './pages/usersPage';
import ArtistDetailsPage from './pages/artistDetailsPage';

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
<Route
  path="/tracks"
  element={<TracksPage />}
/>
<Route
  path="/register"
  element={<RegisterPage />}
/>
<Route
  path="/artists"
  element={<ArtistsPage />}
/>
<Route
  path="/admin"
  element={<AdminPage />}
 />
 <Route
  path="/audits"
  element={<AuditLogsPage />}
/>
<Route
  path="/users"
  element={<UsersPage />}
/>
<Route
  path="/artists/:id"
  element={<ArtistDetailsPage />}
/>
    </Routes>
  );
}

export default App;