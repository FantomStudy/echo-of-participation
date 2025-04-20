import { useEffect } from "react";

export const useClickOutside = (ref, callback, isActive) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isActive && ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, isActive]);
};
