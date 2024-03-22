import { useState, useEffect } from "react";

function useWindowSize() {
  // 安全な初期値を設定
  const [size, setSize] = useState({
    width: 0,
    height: 0, // 初期値として0を設定、適宜調整可能
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 現在のウィンドウの幅を取得して状態に設定
      const updateSize = () => {
        setSize({
          width: window.innerWidth,
          // 高さは初期値または特定の値を維持
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", updateSize);
      // コンポーネントマウント時にサイズを更新
      updateSize();

      return () => {
        window.removeEventListener("resize", updateSize);
      };
    }
  }, []);

  return size;
}

export default useWindowSize;
