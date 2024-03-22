import { useState, useEffect } from "react";

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        // 横幅の変更時のみサイズを更新
        setSize((prevSize) => {
          const newWidth = window.innerWidth;
          const newHeight = window.innerHeight;
          // 横幅が変わった場合、または初回の場合（高さも含めて）サイズを更新
          if (prevSize.width !== newWidth || prevSize.height === 0) {
            return { width: newWidth, height: newHeight };
          }
          // 横幅の変更がない場合はサイズを更新しない
          return prevSize;
        });
      };

      // イベントリスナーを追加
      window.addEventListener("resize", handleResize);
      // 初期サイズを設定
      handleResize();

      return () => {
        // コンポーネントがアンマウントされた時にイベントリスナーを削除
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return size;
}

export default useWindowSize;
