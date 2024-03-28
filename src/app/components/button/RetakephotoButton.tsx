import { Annotation } from "@/app/schemas/type";
import { style } from "@/app/styles/style";
import React from "react";
import BigButton from "./BigButton";
type Props = {
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
};

const RetakephotoButton = ({ setMode, setAnnotation }: Props) => {
  const handleReset = () => {
    setMode("video");
    setAnnotation((prev) => ({
      ...prev,
      points: [],
      imageBase64: "",
    }));
  };

  return (
    // <button
    //   onClick={handleReset}
    //   className={`${style.buttonLayout} w-1/2 flex items-center justify-center h-[40px]`}
    // >
    //   <p className="text-center">再撮影</p>
    // </button>
    <BigButton
      className={`${style.orangeGradation} w-full`}
      onClick={handleReset}
    >
      再撮影
    </BigButton>
  );
};

export default RetakephotoButton;
