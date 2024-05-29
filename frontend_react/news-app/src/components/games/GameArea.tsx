// src/components/games/GameArea.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import useLoadImage from '@/hooks/games/useLoadImage';
import useGameLoop from '@/hooks/games/useGameLoop';
import useCollisionDetection from '@/hooks/games/useCollisionDetection';
import { usePlayer, useEnemies, useRoadLines, getGameParameters } from '@/hooks/games/gameHooks';

interface Props {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  gameOver: () => void;
  gameMode: 'easy' | 'medium' | 'hard';
}

const GameArea: React.FC<Props> = ({ setScore, gameOver, gameMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const { player, movePlayer } = usePlayer();
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const enemies = useEnemies(canvasSize.width, canvasSize.height);
  const roadLines = useRoadLines(canvasSize.width);
  
  const playerImage = useLoadImage('https://raw.githubusercontent.com/BokEumEom/ev-scrape/main/frontend_react/news-app/src/assets/images/player.png');
  const { enemySpeed } = getGameParameters(gameMode);

  const LINE_SPEED = 3;
  const LINE_HEIGHT = 30;
  const PLAYER_WIDTH = 50;

  // Update canvas size on window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        setCanvasSize({ width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Set canvas context and background music
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      setContext(canvas.getContext('2d'));
    }

    const audio = new Audio('https://raw.githubusercontent.com/BokEumEom/ev-scrape/main/frontend_react/news-app/src/assets/audio/bensound-happyrock.mp3');
    audio.loop = true;
    audio.volume = 0.05;
    audio.addEventListener('canplaythrough', () => {
      audio.play().catch((error) => {
        console.error('Failed to play audio:', error);
      });
    });
    musicRef.current = audio;

    return () => {
      audio.pause();
      audio.remove();
    };
  }, []);

  // Move player to a specific position (left and right only)
  const movePlayerToPosition = (x: number) => {
    const newX = Math.max(0, Math.min(canvasSize.width - player.width, x));
    movePlayer(
      newX - player.x,
      0 // No change in y-coordinate
    );
  };

  // Mouse and touch event handlers
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
    
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
    
      movePlayerToPosition(
        Math.max(0, Math.min(canvasSize.width - player.width, x))
      );
    };
    
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;
    
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
    
      movePlayerToPosition(
        Math.max(0, Math.min(canvasSize.width - player.width, x))
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [movePlayer, player.width, player.height, canvasSize.width, canvasSize.height]);

  // Update score
  const updateScore = useCallback(() => {
    setScore((prevScore) => prevScore + 1);
  }, [setScore]);

  // Game loop and canvas drawing
  useGameLoop(() => {
    if (!context || !playerImage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    roadLines.forEach((line) => {
      line.y += LINE_SPEED;
      if (line.y > context.canvas.height) line.y = -LINE_HEIGHT;
      context.fillStyle = 'white';
      context.fillRect(line.x, line.y, 4, LINE_HEIGHT);
    });

    const aspectRatio = playerImage.width / playerImage.height;
    const height = PLAYER_WIDTH / aspectRatio;
    context.drawImage(playerImage, player.x, player.y, PLAYER_WIDTH, height);

    enemies.forEach((enemy) => {
      enemy.y += enemySpeed;
      if (enemy.y > context.canvas.height) {
        enemy.y = -100;
        enemy.x = Math.random() * (canvas.width - enemy.width);
      }
      context.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
    });

    updateScore();
  }, 1000 / 60); // 60 FPS update

  // Collision detection
  useCollisionDetection(player, enemies, () => {
    musicRef.current?.pause();
    gameOver();
  });

  return <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} className="w-full h-full"></canvas>;
};

export default GameArea;
