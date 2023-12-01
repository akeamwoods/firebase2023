import { useEffect } from 'react';

export const useKeyPress = (keys: string | string[], action: () => void): void => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      const keysArray = Array.isArray(keys) ? keys : [keys];
      if (keysArray.includes(event.key)) {
        action();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      // Remove event listener on cleanup
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [keys, action]);
};
