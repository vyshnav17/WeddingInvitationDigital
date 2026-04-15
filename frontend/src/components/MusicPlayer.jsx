import React, { useEffect, useRef } from 'react';

const MusicPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/bg-music.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.playsInline = true;
    audio.volume = 1;
    audioRef.current = audio;

    const tryPlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            window.removeEventListener('pointerdown', tryPlay);
            window.removeEventListener('touchstart', tryPlay);
            window.removeEventListener('keydown', tryPlay);
            window.removeEventListener('scroll', tryPlay);
          })
          .catch(() => {
            // Autoplay may be blocked until a user gesture.
          });
      }
    };

    const onAudioError = () => {
      console.error('Unable to load /bg-music.mp3. Ensure file exists in frontend/public.');
    };

    audio.addEventListener('error', onAudioError);

    // Attempt immediate autoplay on initial load.
    tryPlay();

    // Retry as soon as the first interaction happens (mobile/Safari friendly).
    window.addEventListener('pointerdown', tryPlay, { passive: true });
    window.addEventListener('touchstart', tryPlay, { passive: true });
    window.addEventListener('keydown', tryPlay);
    window.addEventListener('scroll', tryPlay, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('keydown', tryPlay);
      window.removeEventListener('scroll', tryPlay);
      audio.removeEventListener('error', onAudioError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return null;
};

export default MusicPlayer;
