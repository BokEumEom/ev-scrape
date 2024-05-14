// src/hooks/useKakaoScript.tsx
import { useState, useEffect } from 'react';

export const useKakaoScript = (scriptUrl: string) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = scriptUrl;
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                setIsLoaded(true);
            };
            script.onerror = () => {
                setError('Failed to load the script');
            };

            return () => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            };
        } else {
            setIsLoaded(true);
        }
    }, [scriptUrl]);

    return { isLoaded, error };
};
