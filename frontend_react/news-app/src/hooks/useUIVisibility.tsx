// src/hooks/useUIVisibility.tsx
import { useEffect } from 'react';

export const useUIVisibility = (selector: string, visible: boolean) => {
    useEffect(() => {
        const elements = document.querySelectorAll<HTMLElement>(selector);
        elements.forEach(element => {
            element.style.display = visible ? '' : 'none';
        });

        return () => {
            elements.forEach(element => {
                element.style.display = '';
            });
        };
    }, [selector, visible]);
};
