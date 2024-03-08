import React from "react";
import PhotoButton from "./button/PhotoButton";
import PhotoViewButton from "./button/PhotoViewButton";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  size: any;
};

const VideoView = ({ videoRef, setImage, mode, setMode, size }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col mt-8">
      {/* <video
        ref={videoRef}
        width={400}
        height={300}
        autoPlay
        muted
        playsInline
      /> */}
      <video
        ref={videoRef}
        width={size.width}
        height={size.height}
        autoPlay
        muted
        playsInline
      />
      <PhotoViewButton
        videoRef={videoRef}
        setImage={setImage}
        mode={mode}
        setMode={setMode}
        size={size}
      />
    </div>
  );
};

export default VideoView;
