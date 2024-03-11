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
  windowSize: any;
};

const VideoView = ({
  videoRef,
  setImage,
  mode,
  setMode,
  setSize,
  size,
  windowSize,
}: Props) => {
  console.log(videoRef.current);

  return (
    <div className="h-auto w-full flex items-center justify-center flex-col mt-8 relative">
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
        width={windowSize.width}
        height={windowSize.height}
        autoPlay
        muted
        playsInline
        className="w-full h-auto"
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
