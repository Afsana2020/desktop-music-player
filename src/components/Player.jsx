import React, { useRef, useEffect } from 'react';
import Cassette from './Cassette';

const Player = ({ currentSong, isPlaying, onPlayPause, onNext, onPrev, onQuoteChange, onSeek }) => {
  return (
    <div className="boombox-container">
      <div className="boombox-header">
        <div className="boombox-brand">A.H. MIXTAPE</div>
      </div>
      
      <div className="boombox-main">
        <div className="speaker">
          <div className="speaker-cone">
            <div className="speaker-center"></div>
          </div>
        </div>

        <div className="center-panel">
          <div className="cassette-dock">
            <div className="dock-door"></div>
            <div className="dock-glass-glare"></div>
            {currentSong ? (
              <Cassette 
                title={currentSong.title}
                colorClass={currentSong.colorClass}
                isPlaying={isPlaying}
                isActive={true}
              />
            ) : (
              <div style={{ color: '#555', fontFamily: 'monospace' }}>INSERT TAPE</div>
            )}
          </div>

          <div className="marquee-container">
            <div className="marquee-text-wrapper">
              <span className="marquee-text">
                {currentSong ? `PLAYING: ${currentSong.title}` : 'IDLE - NO DEMONSTRATION LOADED'}
              </span>
            </div>
          </div>

          <div className="controls-row">
            <button className="control-btn" onClick={onPrev} title="Previous">&#9196;</button>
            <button className="control-btn" onClick={() => onSeek(-10)} title="Rewind 10s">⏪</button>
            <button className={`control-btn ${isPlaying ? 'active' : ''}`} onClick={onPlayPause} title="Play/Pause">
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="control-btn" onClick={() => onSeek(10)} title="Forward 10s">⏩</button>
            <button className="control-btn" onClick={onNext} title="Next">&#9195;</button>
          </div>

          <div className="quote-area">
            {currentSong ? (
              <textarea 
                className="quote-input"
                value={currentSong.quote}
                onChange={(e) => onQuoteChange && onQuoteChange(currentSong.id, e.target.value)}
                placeholder="Write a custom mixtape note..."
                spellCheck="false"
              />
            ) : (
              <div style={{opacity: 0.5, fontStyle: 'italic'}}>"No Cassette Loaded"</div>
            )}
          </div>
        </div>

        <div className="speaker">
          <div className="speaker-cone">
            <div className="speaker-center"></div>
            <div className="speaker-screws top-left"></div>
            <div className="speaker-screws top-right"></div>
            <div className="speaker-screws bottom-left"></div>
            <div className="speaker-screws bottom-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
