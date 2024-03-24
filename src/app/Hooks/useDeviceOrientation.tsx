import { useState, useEffect } from "react";

const getOrientation = () => {
  // window オブジェクトが存在するかチェック
  if (typeof window !== "undefined") {
    // Determine the current orientation of the device
    const orientation =
      (window.screen.orientation || {}).type ||
      window.screen.orientation ||
      window.screen.orientation;

    if (orientation) {
      if (orientation.includes("portrait")) {
        return "portrait";
      } else if (orientation.includes("landscape")) {
        return "landscape";
      }
    }
    // Fallback for browsers that do not support window.screen.orientation
    return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  }
  // window オブジェクトがない場合（SSR時）はデフォルト値を返す
  return "portrait";
};

const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState("portrait"); // デフォルト値

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== "undefined") {
      const handleOrientationChange = () => {
        setOrientation(getOrientation());
      };

      window.addEventListener("resize", handleOrientationChange);
      window.addEventListener("orientationchange", handleOrientationChange);

      return () => {
        window.removeEventListener("resize", handleOrientationChange);
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      };
    }
  }, []);

  return orientation;
};

export default useDeviceOrientation;
