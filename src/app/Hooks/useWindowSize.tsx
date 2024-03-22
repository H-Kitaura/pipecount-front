import { useState, useEffect } from "react";

function useWindowSize() {
  // 安全な初期値を設定
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // 初期サイズを設定

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return size;
}

export default useWindowSize;
