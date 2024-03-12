"use client";
import React from "react";

type Props = {
  devices: MediaDeviceInfo[];
  selectedDevice: string | null;
  setSelectedDevice: React.Dispatch<React.SetStateAction<string | null>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({
  devices,
  selectedDevice,
  setSelectedDevice,
  setMode,
}: Props) => {
  return (
    <div className="flex items-center justify-between py-2 px-4">
      <p className="text-2xl">PIPE COUNT</p>
      {/* <select onChange={(e) => setSelectedDevice(e.target.value)}>
        {devices.map((v) => (
          <option key={v.deviceId}>{v.label}</option>
        ))}
      </select> */}
      <select
        value={selectedDevice || ""}
        onChange={(e) => {
          setSelectedDevice(e.target.value);
          setMode("video");
        }}
      >
        <option value="">カメラを選択してください</option>
        {devices.map((v) => (
          <option key={v.deviceId} value={v.deviceId}>
            {v.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Header;
