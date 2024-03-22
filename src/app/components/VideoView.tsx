import React from "react";
import PhotoButton from "./button/PhotoButton";
import PhotoViewButton from "./button/PhotoViewButton";
import Webcam from "react-webcam";

type Props = {
  videoRef: any;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  size: any;
  // setSize: React.Dispatch<React.SetStateAction<any>>;
  cameraCheck: boolean;
  selectedDevice: string;
};

const VideoView = ({
  videoRef,
  setImage,
  mode,
  setMode,
  // setSize,
  size,
  cameraCheck,
  selectedDevice,
}: Props) => {
  if (!videoRef) return;

  const videoConstraints = {
    width: 800,
    height: 800,
    facingMode: "user",
  };

  return (
    <div
      className={`${
        mode === "video" && cameraCheck
          ? "h-full w-full flex items-center justify-center flex-col relative"
          : "hidden"
      }`}
    >
      {/* <video
        ref={videoRef}
        // width={size.width}
        // height={size.height}
        autoPlay
        muted
        playsInline
        className="w-full h-auto"
      /> */}
      <Webcam
        audio={false}
        ref={videoRef}
        width={size}
        height={size}
        screenshotFormat="image/jpeg"
        className="w-full h-auto"
        // videoConstraints={videoConstraints}
        // videoConstraints={{ deviceId: selectedDevice }}
        videoConstraints={{
          width: size,
          height: size,
          deviceId: selectedDevice,
        }}
      />

      <PhotoViewButton
        videoRef={videoRef}
        setImage={setImage}
        mode={mode}
        setMode={setMode}
        // setSize={setSize}
      />
    </div>
  );
};

export default VideoView;
