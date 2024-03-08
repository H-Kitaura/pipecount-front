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
  const handlePhotoShot = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    console.log(video.videoWidth, video.videoHeight);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setImage(imageData);
    setMode("image");
  };

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
