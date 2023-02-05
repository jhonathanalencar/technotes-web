import { useEffect, useState } from 'react';

function usePersist() {
  const [persist, setPersist] = useState(() => {
    const storedJSON = localStorage.getItem('@techNotes:0.0.1:persist');

    if (storedJSON) {
      return JSON.parse(storedJSON) as boolean;
    } else {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('@techNotes:0.0.1:persist', JSON.stringify(persist));
  }, [persist]);

  return { persist, setPersist };
}

export { usePersist };
