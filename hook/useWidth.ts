import React, { useState, useEffect } from "react";

const useWidth = () => {
  const [width, setWidth] = useState(0); // default width, detect on server.
  useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

export default useWidth;
