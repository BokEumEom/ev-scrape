// src/hooks/useResizeTextarea.tsx
import { useState, useCallback } from 'react';

const useResizeTextarea = (handleRef: any) => {
  const [textareaHeight, setTextareaHeight] = useState('52px'); // Default height as string to append 'px'

  const resize = useCallback((e) => {
    if (handleRef.current) {
      const newHeight = e.clientY - handleRef.current.getBoundingClientRect().top;
      setTextareaHeight(`${newHeight}px`);
    }
  }, [handleRef]);

  const startResize = useCallback(() => {
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
  }, [resize]);

  const stopResize = useCallback(() => {
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
  }, [resize]);

  return {
    textareaHeight,
    startResize
  };
};

export default useResizeTextarea;