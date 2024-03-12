import { style } from "@/app/styles/style";
import React, { useState } from "react";
import RetakephotoButton from "./RetakephotoButton";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setPoints: React.Dispatch<React.SetStateAction<any>>;
};

const PhotoButton = ({
  videoRef,
  setImage,
  mode,
  setMode,
  setPoints,
}: Props) => {
  return (
    <>
      {mode === "canvas" && (
        <RetakephotoButton
          setMode={setMode}
          setImage={setImage}
          setPoints={setPoints}
        />
      )}
    </>
  );
};

export default PhotoButton;
