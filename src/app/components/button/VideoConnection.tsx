import { style } from "@/app/styles/style";
import React, { useEffect } from "react";

type Props = {
  selectedDevice: string | null;
  setSelectedDevice: React.Dispatch<React.SetStateAction<string | null>>;
  devices: any;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  videoRef: React.RefObject<HTMLVideoElement>;
  cameraCheck: boolean;
  setCameraCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setSize: React.Dispatch<React.SetStateAction<any>>;
};

const VideoConnection = ({
  selectedDevice,
  setSelectedDevice,
  devices,
  setMode,
  videoRef,
  cameraCheck,
  setCameraCheck,
  setSize,
}: Props) => {
  useEffect(() => {
    if (!cameraCheck) return;
    const isLandscapeMode = () => {
      // ウィンドウの幅と高さを使用してデバイスの向きを判断
      return window.innerWidth > window.innerHeight;
    };
    const updateVideoResolution = () => {
      // const isLandscape = window.screen.orientation.type.includes("landscape");
      const isLandscape = isLandscapeMode();
      const constraints = {
        audio: false,
        video: {
          deviceId: getDevice ? getDevice.deviceId : undefined,
          aspectRatio: isLandscape ? { ideal: 16 / 9 } : { ideal: 9 / 16 },
          width: { ideal: isLandscape ? 1280 : 720 },
          height: { ideal: isLandscape ? 720 : 1280 },
        },
      };
      setSize({
        width: isLandscape ? "720px" : "100%",
        height: isLandscape ? "100%" : "1280px",
      });
      getPermission(constraints);
    };

    window.screen.orientation.addEventListener("change", updateVideoResolution);

    // 初期読み込み時にも解像度を更新
    updateVideoResolution();

    return () => {
      window.screen.orientation.removeEventListener(
        "change",
        updateVideoResolution
      );
    };
  }, [cameraCheck, selectedDevice]);

  const getPermission = async (constraints: any) => {
    if (videoRef.current === null) return;
    try {
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        // 既存のストリームを停止する
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error", err);
      alert("カメラ認証ができませんでした。");
    }
  };

  //デバイスのidが一致しているものを見つけて取得する
  const getDevice =
    devices &&
    selectedDevice &&
    devices.find((v: any) => v.deviceId === selectedDevice);

  //カメラ表示の時に使うハンドラー
  const handleConnectClick = () => {
    // getPermission(constraints);
    setCameraCheck(true);
  };

  //カメラを切るときに使うハンドラー
  const handleUnConnectClick = () => {
    setCameraCheck(false);
  };

  console.log(videoRef.current);

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
