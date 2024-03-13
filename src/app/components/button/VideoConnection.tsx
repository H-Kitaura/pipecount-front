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
  useEffect(() => {}, [selectedDevice]);
  const handleConnectClick = () => {
    const constraints = {
      audio: false,
      video: {
        deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
      },
    };
    console.log("constraints", constraints);
    console.log(selectedDevice);

    getPermission(constraints);
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
