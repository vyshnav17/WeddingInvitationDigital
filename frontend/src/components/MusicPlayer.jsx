import React, { useEffect, useRef } from 'react';

const MusicPlayer = ({ playing }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/bg-music.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.playsInline = true;
    audio.volume = 0; // Start at 0 for fade-in
    audioRef.current = audio;

    const onAudioError = () => {
      console.error('Unable to load /bg-music.mp3. Ensure file exists in frontend/public.');
    };

    audio.addEventListener('error', onAudioError);

    return () => {
      audio.removeEventListener('error', onAudioError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    let interval;
    if (playing && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Fade in volume
            let vol = 0;
            interval = setInterval(() => {
              vol += 0.05;
              if (vol >= 1) {
                if (audioRef.current) audioRef.current.volume = 1;
                clearInterval(interval);
              } else {
                if (audioRef.current) audioRef.current.volume = vol;
              }
            }, 100);
          })
          .catch(error => {
            console.log("Playback failed:", error);
          });
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playing]);

  return null;
};

export default MusicPlayer;
