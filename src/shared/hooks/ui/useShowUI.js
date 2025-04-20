import { useState } from "react";

export const useShowUI = () => {
  const [isShow, setIsShow] = useState(false);

  const toggleShow = () => {
    setIsShow((prev) => !prev);
  };

  return { isShow, setIsShow, toggleShow };
};
