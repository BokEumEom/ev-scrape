// src/hooks/games/useGameLoop.ts
import { useEffect, useRef } from 'react';

const useGameLoop = (callback: () => void) => {
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = () => {
      callback();
      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);
};

export default useGameLoop;
