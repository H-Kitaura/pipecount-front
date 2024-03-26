import { style } from "@/app/styles/style";
import React, { useEffect } from "react";

type Props = {
  cameraCheck: boolean;
  setCameraCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoConnection = ({ cameraCheck, setCameraCheck }: Props) => {
  //カメラ表示の時に使うハンドラー
  const handleConnectClick = () => {
    setCameraCheck(true);
  };

  //カメラを切るときに使うハンドラー
  const handleUnConnectClick = () => {
    setCameraCheck(false);
  };

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
