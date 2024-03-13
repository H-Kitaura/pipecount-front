"use client";
import React from "react";
import VideoConnection from "./button/VideoConnection";

type Props = {
  devices: MediaDeviceInfo[];
  selectedDevice: string | null;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  videoRef: React.RefObject<HTMLVideoElement>;
  setSelectedDevice: React.Dispatch<React.SetStateAction<string | null>>;
  cameraCheck: boolean;
  setCameraCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({
  devices,
  selectedDevice,
  setMode,
  videoRef,
  setSelectedDevice,
  cameraCheck,
  setCameraCheck,
}: Props) => {
  return (
    <div className="flex items-center justify-between py-2 px-4">
      <p className="text-2xl">PIPE COUNT</p>
      {/* {cameraCheck && (
        <select onChange={(e) => setSelectedDevice(e.target.value)}>
          {devices.map((v) => (
            // <option key={v.deviceId}>{v.label}</option>
            <option key={v.deviceId} value={v.deviceId}>
              {v.label}
            </option>
          ))}
        </select>
      )} */}
      <VideoConnection
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
        devices={devices}
        setMode={setMode}
        videoRef={videoRef}
        cameraCheck={cameraCheck}
        setCameraCheck={setCameraCheck}
      />
    </div>
  );
};

export default Header;
