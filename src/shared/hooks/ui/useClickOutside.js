import { useEffect } from "react";

export const useClickOutside = (ref, callback, isActive) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref, callback, isActive]);
};
