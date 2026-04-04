import React from 'react';

const Cassette = ({ title, colorClass, isPlaying, onClick, isActive, onRemove }) => {
  return (
    <div className="cassette-wrapper" style={{ position: 'relative' }}>
      {onRemove && (
        <button 
          className="remove-btn" 
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
        >
          &#10005;
        </button>
      )}
      <div 
        className={`cassette ${colorClass} ${isPlaying ? 'playing' : ''} ${isActive ? 'active-cassette' : ''}`}
        onClick={onClick}
      >
        <div className="cassette-label">
          <div className="cassette-title">{title}</div>
        </div>
        <div className="spindle-area">
          <div className="spindle">
            <div className="spindle-teeth"></div>
          </div>
          <div className="tape-window"></div>
          <div className="spindle">
            <div className="spindle-teeth"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cassette;
