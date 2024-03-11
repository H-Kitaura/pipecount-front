import { style } from "@/app/styles/style";
import React, { useState } from "react";
import RetakephotoButton from "./RetakephotoButton";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  // size: any;
  setSize: React.Dispatch<React.SetStateAction<any>>;
};

const PhotoViewButton = ({
  videoRef,
  setImage,
  mode,
  setMode,
  setSize,
}: // size,
Props) => {
  // const handlePhotoShot = () => {
  //   const video = videoRef.current;
  //   const canvas = document.createElement("canvas");
  //   if (!video || !canvas) return;
  //   canvas.width = size.width;
  //   canvas.height = size.height;
  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;
  //   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  //   const imageData = canvas.toDataURL("image/png");
  //   setImage(imageData);
  //   setSize({
  //     width: canvas.width,
  //     height: canvas.height,
  //   });
  //   setMode("image");
  // };
  const handlePhotoShot = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    if (!video || !canvas) return;

    // ビデオのアスペクト比を計算
    const videoAspectRatio = video.videoWidth / video.videoHeight;

    // キャンバスのサイズをビデオのアスペクト比に合わせて設定
    if (video.videoHeight > video.videoWidth) {
      // 縦向きの場合
      canvas.width = video.videoHeight * videoAspectRatio;
      canvas.height = video.videoHeight;
    } else {
      // 横向きの場合
      canvas.width = video.videoWidth;
      canvas.height = video.videoWidth / videoAspectRatio;
    }

    setSize({
      width: canvas.width,
      height: canvas.height,
    });

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ビデオの幅と高さを指定して描画
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
          className="rounded-full h-12 w-12 border-4 border-white shadow-md m-4 absolute bottom-0"
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
