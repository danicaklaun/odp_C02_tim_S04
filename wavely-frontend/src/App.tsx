import {
  Routes,
  Route
} from 'react-router-dom';

import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import PlaylistsPage from './pages/playlistsPage';
import LibraryPage from './pages/libraryPage';

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
    </Routes>
  );
}

export default App;