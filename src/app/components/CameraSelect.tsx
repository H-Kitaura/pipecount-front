import React, { useEffect } from "react";

type Props = {
  devices: MediaDeviceInfo[];
  setDevices: React.Dispatch<React.SetStateAction<MediaDeviceInfo[]>>;
  selectedDevice: string;
  setSelectedDevice: React.Dispatch<React.SetStateAction<string>>;
};

const CameraSelect = ({
  devices,
  setDevices,
  selectedDevice,
  setSelectedDevice,
}: Props) => {
  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(e.target.value);
  };
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    });
  }, []);

  return (
    <div className="px-4">
      {/* <select onChange={(e) => setSelectedDevice(e.target.value)}>
        {devices.map((v) => (
          // <option key={v.deviceId}>{v.label}</option>
          <option key={v.deviceId} value={v.deviceId}>
            {v.label}
          </option>
        ))}
      </select> */}
      <select onChange={handleDeviceChange} value={selectedDevice}>
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CameraSelect;
