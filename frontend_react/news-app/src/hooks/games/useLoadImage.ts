// src/hooks/games/useLoadImage.ts
import { useState, useEffect } from 'react';

const useLoadImage = (src: string) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImage(img);
    img.onerror = (error) => console.error(`Failed to load image ${src}:`, error);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return image;
};

export default useLoadImage;
