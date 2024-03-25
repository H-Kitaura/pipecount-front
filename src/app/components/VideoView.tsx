import React from "react";
import PhotoButton from "./button/PhotoButton";
import PhotoViewButton from "./button/PhotoViewButton";
import Webcam from "react-webcam";
import useDeviceOrientation from "../Hooks/useDeviceOrientation";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  size: any;
  setSize: React.Dispatch<React.SetStateAction<any>>;
  cameraCheck: boolean;
  selectedDevice: string;
};

const VideoView = ({
  videoRef,
  setImage,
  mode,
  setMode,
  setSize,
  size,
  cameraCheck,
  selectedDevice,
}: Props) => {
  const orientation = useDeviceOrientation(); // デバイスの向きを取得

  if (!videoRef) return;
  // デバイスの向きに基づいてビデオ制約を設定
  const videoConstraints =
    orientation === "landscape"
      ? {
          width: 1280,
          height: 720,
          aspectRatio: 16 / 9,
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
        }
      : {
          width: 720,
          height: 1280,
          aspectRatio: 9 / 16,
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
        };

  const handleUserMedia = (stream: MediaStream) => {
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length > 0) {
      const trackSettings = videoTracks[0].getSettings();
      console.log("Video track settings:", trackSettings);
      setSize({ width: trackSettings.width, height: trackSettings.height });
    }
  };

  console.log(size);

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
        // width={size.width}
        // height={size.height}
        autoPlay
        muted
        playsInline
        className="w-full h-auto"
      />
      {/* <Webcam
        audio={false}
        ref={videoRef}
        // width={size}
        // height={size}
        screenshotFormat="image/jpeg"
        className="w-full h-auto"
        // videoConstraints={videoConstraints}
        // videoConstraints={{ deviceId: selectedDevice }}
        // videoConstraints={{
        //   width: size,
        //   height: size,
        //   deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
        // }}
        height={videoConstraints.height}
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
        onUserMedia={handleUserMedia}
      /> */}

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
