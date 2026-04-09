-- Kreiranje baze
CREATE DATABASE IF NOT EXISTS wavely;
USE wavely;

-- USERS
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(40) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('listener', 'admin') DEFAULT 'listener',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ARTISTS
CREATE TABLE artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    genre ENUM('Pop','Rock','Hip-Hop','Electronic','Jazz','R&B','Classical') NOT NULL,
    country VARCHAR(60),
    bio TEXT,
    image TEXT
);

-- TRACKS
CREATE TABLE tracks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    artist_id INT NOT NULL,
    duration_sec INT NOT NULL,
    album VARCHAR(120) NOT NULL,
    release_year INT,
    cover_image TEXT,
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);

-- USER_ARTISTS (follow)
CREATE TABLE user_artists (
    user_id INT,
    artist_id INT,
    PRIMARY KEY (user_id, artist_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);

-- USER_TRACKS (library)
CREATE TABLE user_tracks (
    user_id INT,
    track_id INT,
    saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, track_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (track_id) REFERENCES tracks(id)
);

-- PLAYLISTS
CREATE TABLE playlists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(80) NOT NULL,
    description TEXT,
    cover_image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- PLAYLIST_TRACKS
CREATE TABLE playlist_tracks (
    playlist_id INT,
    track_id INT,
    position INT NOT NULL,
    PRIMARY KEY (playlist_id, track_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(id),
    FOREIGN KEY (track_id) REFERENCES tracks(id),
    UNIQUE (playlist_id, position)
);

-- AUDITS
CREATE TABLE audits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- TEST DATA
INSERT INTO artists (name, genre, country)
VALUES ('Senidah', 'Pop', 'Serbia');