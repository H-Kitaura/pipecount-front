import { style } from "@/app/styles/style";
import React, { useEffect } from "react";

type Props = {
  selectedDevice: string | null;
  setSelectedDevice: React.Dispatch<React.SetStateAction<string>>;
  devices: any;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  // videoRef: React.RefObject<HTMLVideoElement>;
  cameraCheck: boolean;
  setCameraCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setSize: React.Dispatch<React.SetStateAction<any>>;
};

const VideoConnection = ({
  selectedDevice,
  setSelectedDevice,
  devices,
  setMode,
  // videoRef,
  cameraCheck,
  setCameraCheck,
  setSize,
}: Props) => {
  //カメラ表示の時に使うハンドラー
  const handleConnectClick = () => {
    // getPermission(constraints);
    setCameraCheck(true);
  };

  //カメラを切るときに使うハンドラー
  const handleUnConnectClick = () => {
    setCameraCheck(false);
  };

  // console.log(videoRef.current);

  return (
    <div className="px-4">
      {cameraCheck ? (
        <>
          <button
            className={`${style.buttonLayout} px-4 h-[30px]`}
            onClick={handleUnConnectClick}
          >
            カメラを非接続
          </button>
        </>
      ) : (
        <>
          <button
            className={`${style.buttonLayout} px-4 h-[30px]`}
            onClick={handleConnectClick}
          >
            カメラを接続
          </button>
        </>
      )}
    </div>
  );
};

export default VideoConnection;

// const constraints = {
//   audio: false,
//   video: {
//     deviceId: getDevice ? getDevice.deviceId : undefined,
//     // aspectRatio: isLandscape ? { ideal: 16 / 9 } : { ideal: 9 / 16 },
//     // width: { ideal: isLandscape ? 1280 : 720 },
//     // height: { ideal: isLandscape ? 720 : 1280 },
//   },
// };
