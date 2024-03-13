import React from "react";
import PhotoButton from "./button/PhotoButton";
import PhotoViewButton from "./button/PhotoViewButton";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  size: any;
  setSize: React.Dispatch<React.SetStateAction<any>>;
};

const VideoView = ({
  videoRef,
  setImage,
  mode,
  setMode,
  setSize,
  size,
}: Props) => {
  if (!videoRef) return;

  return (
    <div
      className={`${
        mode === "video"
          ? "h-full w-full flex items-center justify-center flex-col relative"
          : "hidden"
      }`}
    >
      <video
        ref={videoRef}
        // width={size.width}
        // height={size.height}
        autoPlay
        muted
        playsInline
        // className="w-auto max-h-full"
      />
      <PhotoViewButton
        videoRef={videoRef}
        setImage={setImage}
        mode={mode}
        setMode={setMode}
        // size={size}
        setSize={setSize}
      />
    </div>
  );
};

export default VideoView;
