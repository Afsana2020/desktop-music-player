import React, { useState, useRef, useEffect } from 'react';
import Bookshelf from './components/Bookshelf';
import Player from './components/Player';

const QUOTES = [
  "Track 1 - Custom Note",
];

const COLORS = ['cassette-yellow', 'cassette-blue', 'cassette-red', 'cassette-green', 'cassette-purple', 'cassette-white'];

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    // limit to available slots (max 8)
    const availableSlots = 8 - songs.length;
    const filesToLoad = files.slice(0, availableSlots);

    const newSongs = filesToLoad.map((file, index) => {
      const url = URL.createObjectURL(file);
      const title = file.name.replace(/\.[^/.]+$/, "");
      return {
        id: Date.now() + index,
        title,
        url,
        quote: "", // Starts empty so user can write
        colorClass: COLORS[Math.floor(Math.random() * COLORS.length)]
      };
    });

    setSongs((prev) => [...prev, ...newSongs]);
    if (currentSongIndex === -1 && newSongs.length > 0) {
      setCurrentSongIndex(0); // If nothing is playing, load the first one
    }
    // Clear value so the same file can be uploaded again if deleted
    event.target.value = "";
  };

  const currentSong = currentSongIndex >= 0 && songs.length > 0 ? songs[currentSongIndex] : null;

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error(e));
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error(e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (!currentSong) return;
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (songs.length === 0) return;
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (songs.length === 0) return;
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleSelectSong = (song) => {
    if (song.TYPE_REMOVE) {
      setSongs(prev => prev.filter(s => s.id !== song.id));
      if (currentSongIndex >= 0 && songs[currentSongIndex].id === song.id) {
        setIsPlaying(false);
        setCurrentSongIndex(-1);
      }
      return;
    }

    const index = songs.findIndex(s => s.id === song.id);
    if (index !== -1) {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const handleQuoteChange = (id, newQuote) => {
    setSongs(prev => prev.map(s => s.id === id ? { ...s, quote: newQuote } : s));
  };

  const handleLoadedMetadata = () => {
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error(e));
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded} 
      />

      <Bookshelf 
        songs={songs} 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        onSelectSong={handleSelectSong} 
      />
      
      <Player 
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
        onQuoteChange={handleQuoteChange}
      />

      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 50 }}>
        {songs.length >= 8 ? (
          <div style={{
            background: '#ff7675', color: '#fff', padding: '10px 20px', 
            borderRadius: '5px', fontFamily: 'Orbitron', fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.5)', border: '2px solid #d63031'
          }}>
            SHELF FULL! (REMOVE TO ADD MORE)
          </div>
        ) : (
          <label style={{
            background: '#0fdb1a', color: '#000', padding: '10px 20px', 
            borderRadius: '5px', cursor: 'pointer', fontFamily: 'Orbitron',
            fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.5)'
          }}>
            ADD SONG (MP3)
            <input 
              type="file" 
              multiple 
              accept="audio/*" 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />
          </label>
        )}
      </div>
      <div style={{ 
        position: 'absolute', 
        bottom: 10, 
        right: 20, 
        zIndex: 100, 
        fontFamily: 'Fredoka One, cursive',
        fontSize: '0.8rem',
        color: 'rgba(0,0,0,0.4)',
        pointerEvents: 'none'
      }}>
        Developed by Afsana Hena
      </div>
    </>
  );
}

export default App;
