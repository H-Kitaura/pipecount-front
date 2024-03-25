import React from "react";
import PhotoViewButton from "./button/PhotoViewButton";
import { Annotation } from "../schemas/type";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  size: any;
  cameraCheck: boolean;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
};

const VideoView = ({
  videoRef,
  mode,
  setMode,
  size,
  cameraCheck,
  setAnnotation,
}: Props) => {
  return (
    <div
      className={`${
        mode === "video" && cameraCheck
          ? "h-full w-full flex items-center justify-center flex-col relative"
          : "hidden"
      }`}
    >
      <video
        ref={videoRef}
        width={size.width}
        height={size.height}
        autoPlay
        muted
        playsInline
        className="w-full h-auto"
      />
      <PhotoViewButton
        videoRef={videoRef}
        mode={mode}
        setMode={setMode}
        size={size}
        setAnnotation={setAnnotation}
      />
    </div>
  );
};

export default VideoView;
