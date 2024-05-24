// src/hooks/games/gameHooks.ts
import { useState, useCallback, useEffect } from 'react';

export const usePlayer = () => {
    const [player, setPlayer] = useState({ x: 125, y: 450, width: 50, height: 75 });
  
    const movePlayer = useCallback((dx: number, dy: number) => {
      setPlayer((prev) => ({
        x: Math.max(0, Math.min(750, prev.x + dx)),
        y: Math.max(0, Math.min(525, prev.y + dy)), // Ensure height bounds are respected
        width: prev.width,
        height: prev.height,
      }));
    }, []);
  
    return { player, movePlayer };
};

export const useEnemies = (canvasWidth: number, canvasHeight: number) => {
  const [enemies, setEnemies] = useState<Array<{ x: number; y: number; image: HTMLImageElement; width: number; height: number }>>([]);

  useEffect(() => {
    const loadEnemies = async () => {
      const enemyPromises = Array.from({ length: 7 }, async (_, index) => {
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/BokEumEom/ev-scrape/main/frontend_react/news-app/src/assets/images/enemy${index + 1}.png`;
        await img.decode().catch(error => console.error(`Failed to load enemy image ${index + 1}:`, error));
        const aspectRatio = img.width / img.height;
        const width = 50;
        const height = width / aspectRatio;
        return {
          x: Math.random() * (canvasWidth - width),
          y: -index * 200,
          image: img,
          width,
          height
        };
      });
      const loadedEnemies = await Promise.all(enemyPromises);
      setEnemies(loadedEnemies);
    };
    loadEnemies();
  }, [canvasWidth, canvasHeight]);

  return enemies;
};

export const useRoadLines = (canvasWidth: number) => {
  const [roadLines, setRoadLines] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const lines = Array.from({ length: 5 }, (_, index) => ({
      x: canvasWidth / 2 - 2,
      y: index * 100,
    }));
    setRoadLines(lines);
  }, [canvasWidth]);

  return roadLines;
};

export const getGameParameters = (gameMode: 'easy' | 'medium' | 'hard') => {
    switch (gameMode) {
      case 'easy':
        return {
          enemySpeed: 2,
          playerSpeed: 5,
          spawnRate: 200,
        };
      case 'medium':
        return {
          enemySpeed: 4,
          playerSpeed: 8,
          spawnRate: 150,
        };
      case 'hard':
        return {
          enemySpeed: 6,
          playerSpeed: 10,
          spawnRate: 100,
        };
      default:
        return {
          enemySpeed: 2,
          playerSpeed: 5,
          spawnRate: 200,
        };
    }
};