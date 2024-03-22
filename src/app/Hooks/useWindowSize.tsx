import { useState, useEffect } from "react";

function useWindowSize() {
  // 安全な初期値を設定
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // クライアントサイドの実行を確認
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // イベントリスナーを追加
      window.addEventListener("resize", handleResize);

      // 初期サイズを設定
      handleResize();

      // コンポーネントアンマウント時にイベントリスナーを削除
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); // 空の依存配列を指定して、コンポーネントのマウント時にのみ実行

  return size;
}

export default useWindowSize;
