import { Annotation } from "@/app/schemas/type";
import React, { useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  size: any;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
};

const PhotoViewButton = ({
  videoRef,
  mode,
  setMode,
  size,
  setAnnotation,
}: Props) => {
  function formatCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため、1を加える
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

    return `${year}_${month}_${day}_${hour}_${minute}_${second}`;
  }
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

    // setSize({
    //   width: canvas.width,
    //   height: canvas.height,
    // });

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ビデオの幅と高さを指定して描画
    ctx.drawImage(video, 0, 0, size.width, size.height);

    const imageData = canvas.toDataURL("image/png");
    setAnnotation((prev) => ({
      ...prev,
      imageBase64: imageData,
      imageFilename: "pipeCount" + "_" + formatCurrentDate(),
    }));
    setMode("image");
  };

  // const capture = () => {
  //   const imageSrc = videoRef.current.getScreenshot();
  //   // ここで取得した画像を使用できます
  //   const image = new Image();
  //   image.onload = () => {
  //     setMode("image");
  //   };
  //   image.src = imageSrc;
  //   setImage(imageSrc);
  // };

  return (
    <>
      <button
        onClick={handlePhotoShot}
        className="rounded-full h-14 w-14 border-4 border-white shadow-md m-4 absolute bottom-0"
      >
        <span>
          <MdOutlineCameraAlt className="h-8 w-8 absolute top-[8px] bottom-0 left-[8px] right-0 text-white" />
        </span>
      </button>
    </>
  );
};

export default PhotoViewButton;
