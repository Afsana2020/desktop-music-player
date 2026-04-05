import React from 'react';
import Cassette from './Cassette';

const Bookshelf = ({ songs, currentSong, isPlaying, onSelectSong }) => {
  // Always render 2 shelves (total 8 slots)
  const shelves = [
    songs.slice(0, 4),
    songs.slice(4, 8)
  ];

  return (
    <div className="bookshelf">
      {shelves.map((shelf, shelfIndex) => (
        <div className="shelf-row" key={shelfIndex}>
          {shelf.map((song) => (
            <Cassette 
              key={song.id}
              title={song.title}
              colorClass={song.colorClass}
              isPlaying={currentSong?.id === song.id && isPlaying}
              isActive={currentSong?.id === song.id}
              onClick={() => onSelectSong(song)}
              onRemove={() => onSelectSong({ ...song, TYPE_REMOVE: true })}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Bookshelf;
