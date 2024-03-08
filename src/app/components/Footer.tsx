import React from "react";
import PhotoButton from "./button/PhotoButton";
import PrevButton from "./button/PrevButton";
import NextButton from "./button/NextButton";
import ReportButton from "./button/ReportButton";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  points: any;
  setPoints: React.Dispatch<React.SetStateAction<any>>;
  setTotalCounts: React.Dispatch<React.SetStateAction<number[]>>;
};

const Footer = ({
  videoRef,
  mode,
  setMode,
  setImage,
  points,
  setPoints,
  setTotalCounts,
}: Props) => {
  return (
    <div className="flex items-center justify-center w-full pt-4 space-x-4">
      <PhotoButton
        videoRef={videoRef}
        mode={mode}
        setMode={setMode}
        setImage={setImage}
        setPoints={setPoints}
      />
      {mode === "canvas" && (
        <ReportButton
          setMode={setMode}
          points={points}
          setPoints={setPoints}
          setTotalCounts={setTotalCounts}
        />
      )}
    </div>
  );
};

export default Footer;
