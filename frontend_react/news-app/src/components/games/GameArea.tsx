import React, { useEffect, useRef, useState } from 'react';

interface Props {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  gameOver: () => void;
}

const GameArea: React.FC<Props> = ({ setScore, gameOver }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const playerImageRef = useRef<HTMLImageElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [player, setPlayer] = useState({ x: 125, y: 450 });
  const [enemies, setEnemies] = useState<Array<{ x: number; y: number; image: HTMLImageElement }>>([]);
  const [roadLines, setRoadLines] = useState<Array<{ x: number; y: number }>>([]);
  const keys = useRef<{ [key: string]: boolean }>({
    ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false,
    w: false, a: false, s: false, d: false
  }).current;
  const initializedRef = useRef<boolean>(false); // Add this ref to prevent duplication

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      setContext(canvas.getContext('2d'));
    }

    const playerImage = new Image();
    playerImage.src = '/src/assets/images/player.png'; // Adjust the path as necessary
    playerImage.onload = () => {
      playerImageRef.current = playerImage;
    };

    if (!initializedRef.current) { // Check if enemies are already initialized
      const enemyImages = Array.from({ length: 7 }, (_, index) => {
        const img = new Image();
        img.src = `/src/assets/images/enemy${index + 1}.png`;
        return img;
      });

      enemyImages.forEach((img, index) => {
        img.onload = () => {
          setEnemies(prevEnemies => [
            ...prevEnemies,
            {
              x: Math.random() * ((canvas?.width || 800) - 50),
              y: -index * 200,
              image: img,
            },
          ]);
        };
      });

      const lines = Array.from({ length: 5 }, (_, index) => ({
        x: (canvas?.width || 800) / 2 - 2,
        y: index * 100,
      }));
      setRoadLines(lines);

      initializedRef.current = true; // Mark as initialized to prevent duplication
    }

    const audio = new Audio('/src/assets/audio/bensound-happyrock.mp3');
    audio.loop = true;
    audio.volume = 0.05;
    audio.addEventListener('canplaythrough', () => {
      audio.play().catch((error) => {
        console.error('Failed to play audio:', error);
      });
    });
    musicRef.current = audio;

    const handleKeyDown = (event: KeyboardEvent) => {
      keys[event.key] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keys[event.key] = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault(); // Prevent the default behavior
      const touch = event.touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      setPlayer((prev) => ({
        x: Math.max(0, Math.min(canvas.width - 50, x - 25)),
        y: Math.max(0, Math.min(canvas.height - 100, y - 50)),
      }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('touchmove', handleTouchMove);
      audio.pause();
      audio.remove();
    };
  }, []);

  useEffect(() => {
    if (!context || !playerImageRef.current) return;

    const updateScore = () => {
      setScore((prevScore) => prevScore + 1);
    };

    const gameLoop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      roadLines.forEach((line) => {
        line.y += 3; // Road speed
        if (line.y > context.canvas.height) line.y = -30;
        context.fillStyle = 'white';
        context.fillRect(line.x, line.y, 4, 30);
      });

      if (playerImageRef.current) {
        context.drawImage(playerImageRef.current as CanvasImageSource, player.x, player.y, 50, 100);
      }

      enemies.forEach((enemy) => {
        enemy.y += 2; // Enemy speed
        if (enemy.y > context.canvas.height) enemy.y = -100;
        context.drawImage(enemy.image, enemy.x, enemy.y, 50, 100);
      });

      enemies.forEach((enemy) => {
        if (
          player.x < enemy.x + 50 &&
          player.x + 50 > enemy.x &&
          player.y < enemy.y + 100 &&
          player.y + 100 > enemy.y
        ) {
          musicRef.current?.pause();
          if (requestRef.current !== null) {
            cancelAnimationFrame(requestRef.current);
          }
          gameOver(); // Call the gameOver function
        }
      });

      updateScore();

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [context, enemies, player, roadLines, gameOver, setScore]);

  return <canvas ref={canvasRef} width={800} height={600} className="w-full h-full"></canvas>;
};

export default GameArea;
