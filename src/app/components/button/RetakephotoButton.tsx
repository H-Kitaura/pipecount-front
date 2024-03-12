import { style } from "@/app/styles/style";
import React from "react";
type Props = {
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setPoints?: React.Dispatch<React.SetStateAction<any>>;
};

const RetakephotoButton = ({ setMode, setImage, setPoints }: Props) => {
  const handleReset = () => {
    setMode("video");
    setImage("");
    if (setPoints) {
      setPoints([]);
    }
  };

  return (
    <button
      onClick={handleReset}
      className={`${style.buttonLayout} w-1/2 flex items-center justify-center h-[40px]`}
    >
      <p className="text-center">再撮影</p>
    </button>
  );
};

export default RetakephotoButton;
