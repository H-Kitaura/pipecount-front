"use client";
import React from "react";

type Props = {
  devices: MediaDeviceInfo[];
  setSelectedDevice: React.Dispatch<React.SetStateAction<string | null>>;
};

const Header = ({ devices, setSelectedDevice }: Props) => {
  return (
    <div className="flex items-center justify-between py-2 px-4">
      <p className="text-2xl">PIPECUT COUNT</p>
      {/* <button onClick={handleCameraSelect}>
        <FaRotate className="h-5 w-5" />
      </button> */}
      <select onChange={(e) => setSelectedDevice(e.target.value)}>
        {devices.map((v) => (
          <option key={v.deviceId}>{v.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Header;
