import React, { useEffect } from "react";

type Props = {
  selectedDevice: string | null;
  setSelectedDevice: React.Dispatch<React.SetStateAction<string | null>>;
  devices: any;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  videoRef: React.RefObject<HTMLVideoElement>;
};

const VideoConnection = ({
  selectedDevice,
  setSelectedDevice,
  devices,
  setMode,
  videoRef,
}: Props) => {
  const getDevice =
    devices &&
    selectedDevice &&
    devices.find((v: any) => v.label === selectedDevice);
  // const getDevice =
  //   devices &&
  //   selectedDevice &&
  //   devices.find((v) => v.deviceId === selectedDevice);

  const handleConnectClick = () => {
    const isLandscape = window.screen.orientation.type.includes("landscape");
    const constraints = {
      audio: false,
      video: {
        deviceId: getDevice ? getDevice.deviceId : undefined,
        // aspectRatio: isLandscape ? { ideal: 16 / 9 } : { ideal: 9 / 16 },
        width: { ideal: isLandscape ? 1280 : 720 },
        height: { ideal: isLandscape ? 720 : 1280 },
      },
    };
    getPermission(constraints);
  };
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
    if (devices && devices.length > 0) {
      setSelectedDevice(devices[0].deviceId);
      setMode("video");
    }
  }, [devices]);

  return <button onClick={handleConnectClick}>カメラを接続</button>;
};

export default VideoConnection;
