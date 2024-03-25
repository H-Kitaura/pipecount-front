"use client";
import React from "react";
import VideoConnection from "./button/VideoConnection";

type Props = {
  devices: MediaDeviceInfo[];
  selectedDevice: string | null;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  videoRef: React.RefObject<HTMLVideoElement>;
  setSelectedDevice: React.Dispatch<React.SetStateAction<string>>;
  cameraCheck: boolean;
  setCameraCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setSize: React.Dispatch<React.SetStateAction<any>>;
};

const Header = ({
  devices,
  selectedDevice,
  setMode,
  setSelectedDevice,
  cameraCheck,
  setCameraCheck,
  setSize,
}: Props) => {
  return (
    <div className="flex items-center justify-between py-2 px-4">
      <p className="text-2xl">PIPE COUNT</p>
      <VideoConnection
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
        devices={devices}
        setMode={setMode}
        cameraCheck={cameraCheck}
        setCameraCheck={setCameraCheck}
        setSize={setSize}
      />
    </div>
  );
};

export default Header;
