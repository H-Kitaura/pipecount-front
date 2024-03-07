import { style } from "@/app/styles/style";
import React, { useState } from "react";
import RetakephotoButton from "./RetakephotoButton";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  size: any;
};

const PhotoViewButton = ({
  videoRef,
  setImage,
  mode,
  setMode,
  size,
}: Props) => {
  const handlePhotoShot = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    if (!video || !canvas) return;
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setImage(imageData);
    setMode("image");
  };

  return (
    <>
      {mode === "video" ? (
        <button
          onClick={handlePhotoShot}
          className="rounded-full h-12 w-12 border-4 border-white shadow-md m-4 relative"
        >
          <span className="bg-white h-9 w-9 rounded-full absolute top-[2px] bottom-0 left-[2px] right-0"></span>
        </button>
      ) : (
        <RetakephotoButton setMode={setMode} setImage={setImage} />
      )}
    </>
  );
};

export default PhotoViewButton;
