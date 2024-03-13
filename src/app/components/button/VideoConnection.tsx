import React, { useEffect } from "react";

type Props = {
  selectedDevice: string | null;
  setSelectedDevice: React.Dispatch<React.SetStateAction<string | null>>;
  devices: any;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  videoRef: React.RefObject<HTMLVideoElement>;
  cameraCheck: boolean;
  setCameraCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoConnection = ({
  selectedDevice,
  setSelectedDevice,
  devices,
  setMode,
  videoRef,
  cameraCheck,
  setCameraCheck,
}: Props) => {
  const getPermission = async (constraints: any) => {
    if (videoRef.current === null) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error", err);
      alert("カメラ認証ができませんでした。");
    }
  };
  useEffect(() => {
    const isLandscape = window.screen.orientation.type.includes("landscape");

    const constraints = {
      audio: false,
      video: {
        deviceId: getDevice ? getDevice.deviceId : undefined,
        aspectRatio: isLandscape ? { ideal: 16 / 9 } : { ideal: 9 / 16 },
        width: { ideal: isLandscape ? 1280 : 720 },
        height: { ideal: isLandscape ? 720 : 1280 },
      },
    };

    getPermission(constraints);
  }, []);

  const getDevice =
    devices &&
    selectedDevice &&
    devices.find((v: any) => v.deviceId === selectedDevice);

  const handleConnectClick = () => {
    // getPermission(constraints);
    setCameraCheck(true);
  };

  const handleUnConnectClick = () => {
    setCameraCheck(false);
  };

  alert(selectedDevice);
  return (
    <div className="px-4">
      {cameraCheck ? (
        <>
          <button onClick={handleUnConnectClick}>カメラを非接続</button>
        </>
      ) : (
        <>
          <button onClick={handleConnectClick}>カメラを接続</button>
        </>
      )}
    </div>
  );
};

export default VideoConnection;
