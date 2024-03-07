import React from "react";
import PhotoButton from "./button/PhotoButton";
import PhotoViewButton from "./button/PhotoViewButton";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

const VideoView = ({ videoRef, setImage, mode, setMode }: Props) => {
  return (
    <div className="flex items-center justify-center flex-col">
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
        className="flex items-center justify-center"
        autoPlay
        muted
        playsInline
      />
      <PhotoViewButton
        videoRef={videoRef}
        setImage={setImage}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
};

export default VideoView;
