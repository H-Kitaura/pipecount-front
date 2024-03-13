import React, { useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";

type Props = {
  videoRef: any;
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

  //   // ビデオのアスペクト比を計算
  //   const videoAspectRatio = video.videoWidth / video.videoHeight;

  //   // キャンバスのサイズをビデオのアスペクト比に合わせて設定
  //   if (video.videoHeight > video.videoWidth) {
  //     // 縦向きの場合
  //     canvas.width = video.videoHeight * videoAspectRatio;
  //     canvas.height = video.videoHeight;
  //   } else {
  //     // 横向きの場合
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoWidth / videoAspectRatio;
  //   }

  //   setSize({
  //     width: canvas.width,
  //     height: canvas.height,
  //   });

  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;

  //   // ビデオの幅と高さを指定して描画
  //   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  //   const imageData = canvas.toDataURL("image/png");
  //   setImage(imageData);
  //   setMode("image");
  // };

  const capture = () => {
    const imageSrc = videoRef.current.getScreenshot();
    // ここで取得した画像を使用できます
    console.log(imageSrc);
    setImage(imageSrc);
    setMode("image");
  };

  return (
    <>
      <button
        onClick={capture}
        className="rounded-full h-14 w-14 border-4 border-white shadow-md m-4 absolute bottom-0"
      >
        {/* <span className="bg-white h-12 w-12 rounded-full absolute top-0 bottom-0 left-0 right-0 border-2"> */}
        <span className="">
          <MdOutlineCameraAlt className="h-8 w-8 absolute top-[8px] bottom-0 left-[8px] right-0 text-white" />
        </span>
      </button>
    </>
  );
};

export default PhotoViewButton;
