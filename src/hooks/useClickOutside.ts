import { useEffect, RefObject } from 'react';

/**
 * Hook that closes a component when clicking outside of it
 * @param ref - Reference to the element to detect clicks outside of
 * @param callback - Function to call when click happens outside
 * @param isOpen - Whether the component is currently open
 */
export function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void,
  isOpen: boolean = true
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, isOpen]);
}
