import React from "react";

type Props = {
  devices: MediaDeviceInfo[];
  setSelectedDevice: React.Dispatch<React.SetStateAction<string | null>>;
};

const CameraSelect = ({ devices, setSelectedDevice }: Props) => {
  return (
    <div className="px-4">
      <select onChange={(e) => setSelectedDevice(e.target.value)}>
        {devices.map((v) => (
          // <option key={v.deviceId}>{v.label}</option>
          <option key={v.deviceId} value={v.deviceId}>
            {v.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CameraSelect;
