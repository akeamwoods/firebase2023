import { useEffect } from 'react';

export const usePreventBodyScroll = (open: boolean): void => {
  useEffect(() => {
    if (open) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling
      document.body.style.overflow = '';
    }

    return () => {
      // Reset overflow when component is unmounted
      document.body.style.overflow = '';
    };
  }, [open]);
};
