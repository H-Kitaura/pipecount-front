import { style } from "@/app/styles/style";
import React from "react";
type Props = {
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const RetakephotoButton = ({ setMode, setImage }: Props) => {
  const handleReset = () => {
    setMode("video");
    setImage("");
  };

  return (
    <button
      onClick={handleReset}
      className={`${style.buttonLayout} w-1/5 flex items-center justify-center h-[40px]`}
    >
      <p className="text-center">再撮影</p>
    </button>
  );
};

export default RetakephotoButton;
