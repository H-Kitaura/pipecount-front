import React, { useEffect } from "react";

type Props = {
  devices: MediaDeviceInfo[];
  setSelectedDevice: React.Dispatch<React.SetStateAction<string>>;
};

const CameraSelect = ({ devices, setSelectedDevice }: Props) => {
  // const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedDevice(e.target.value);
  // };
  return (
    <div className="px-4">
      {/* <select onChange={(e) => handleDeviceChange}> */}
      <select onChange={(e) => setSelectedDevice(e.target.value)}>
        {devices.map((v) => (
          // <option key={v.deviceId}>{v.label}</option>
          <option key={v.deviceId} value={v.deviceId}>
            {v.label}
          </option>
        ))}
      </select>
      {/* <select onChange={handleDeviceChange} value={selectedDevice}>
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default CameraSelect;
