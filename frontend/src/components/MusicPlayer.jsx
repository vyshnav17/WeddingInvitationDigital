import React, { useEffect, useRef } from 'react';

const MusicPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Custom audio source from public folder
    audioRef.current = new Audio('/bg-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const tryPlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            document.removeEventListener('click', tryPlay);
            document.removeEventListener('touchstart', tryPlay);
            document.removeEventListener('scroll', tryPlay);
          })
          .catch(e => console.log('Waiting for user interaction to autoplay audio.'));
      }
    };

    // Attempt direct autoplay first
    tryPlay();

    // Browsers block audio without user interaction.
    // So we attach listeners: as soon as they click, touch, or scroll, the music plays!
    document.addEventListener('click', tryPlay);
    document.addEventListener('touchstart', tryPlay);
    document.addEventListener('scroll', tryPlay, { once: true });
    
    return () => {
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('scroll', tryPlay);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return null;
};

export default MusicPlayer;
