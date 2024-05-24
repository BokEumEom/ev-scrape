// src/hooks/games/useCollisionDetection.ts
import { useEffect } from 'react';

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
}

const useCollisionDetection = (
  player: Player,
  enemies: Enemy[],
  onCollision: () => void
) => {
  useEffect(() => {
    const detectCollision = () => {
      enemies.forEach((enemy) => {
        const playerPadding = 10;
        const enemyPadding = 10;
        if (
          player.x + playerPadding < enemy.x + enemy.width - enemyPadding &&
          player.x + player.width - playerPadding > enemy.x + enemyPadding &&
          player.y + playerPadding < enemy.y + enemy.height - enemyPadding &&
          player.y + player.height - playerPadding > enemy.y + enemyPadding
        ) {
          onCollision();
        }
      });
    };

    detectCollision();
  }, [player, enemies, onCollision]);
};

export default useCollisionDetection;
