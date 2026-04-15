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
            removeInteractionListeners();
          })
          .catch(() => {
            // Autoplay may be blocked until a user gesture.
          });
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('keydown', tryPlay);
      window.removeEventListener('scroll', tryPlay);
      window.removeEventListener('wheel', tryPlay);
      window.removeEventListener('touchmove', tryPlay);
      document.removeEventListener('scroll', tryPlay, true);
      document.removeEventListener('wheel', tryPlay, true);
      document.removeEventListener('touchmove', tryPlay, true);
    };

    const onAudioError = () => {
      console.error('Unable to load /bg-music.mp3. Ensure file exists in frontend/public.');
    };

    audio.addEventListener('error', onAudioError);

    // Attempt immediate autoplay on initial load.
    tryPlay();

    // Retry a few times early in case browser policy unlocks shortly after load.
    const retryInterval = window.setInterval(tryPlay, 800);
    const stopRetryTimeout = window.setTimeout(() => window.clearInterval(retryInterval), 8000);

    // Retry as soon as the first interaction happens (mobile/Safari friendly).
    window.addEventListener('pointerdown', tryPlay, { passive: true });
    window.addEventListener('touchstart', tryPlay, { passive: true });
    window.addEventListener('keydown', tryPlay);
    window.addEventListener('scroll', tryPlay, { passive: true });
    window.addEventListener('wheel', tryPlay, { passive: true });
    window.addEventListener('touchmove', tryPlay, { passive: true });
    document.addEventListener('scroll', tryPlay, { passive: true, capture: true });
    document.addEventListener('wheel', tryPlay, { passive: true, capture: true });
    document.addEventListener('touchmove', tryPlay, { passive: true, capture: true });

    return () => {
      window.clearInterval(retryInterval);
      window.clearTimeout(stopRetryTimeout);
      removeInteractionListeners();
      audio.removeEventListener('error', onAudioError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return null;
};

export default MusicPlayer;
