"use client";
import React from "react";
import VideoConnection from "./button/VideoConnection";

type Props = {
  cameraCheck: boolean;
  setCameraCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setDevices: React.Dispatch<React.SetStateAction<MediaDeviceInfo[]>>;
};

const Header = ({ cameraCheck, setCameraCheck, setDevices }: Props) => {
  return (
    <div className="flex items-center justify-between py-2 px-4">
      <p className="text-2xl font-bold text-gradient-ai">PIPE-COUNT</p>
      <VideoConnection
        cameraCheck={cameraCheck}
        setCameraCheck={setCameraCheck}
        setDevices={setDevices}
      />
    </div>
  );
};

export default Header;
