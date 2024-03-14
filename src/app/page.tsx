"use client";
import { useEffect, useRef, useState } from "react";
import AICountContent from "./components/AICountContent";
import Container from "./components/Container";
import MainImageDisplay from "./components/MainImageDisplay";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useVideoDeviceList } from "./Hooks/useVideoDeviceList";
import CordinatesButton from "./components/button/CordinatesButton";
import { dammyPoints } from "./dammyData";
import PointSizeSlider from "./components/PointSizeSlider";
import CountResult from "./components/CountResult";
import TotalCountResult from "./components/TotalCountResult";
import CameraSelect from "./components/CameraSelect";

export default function Home() {
  //hooks=======================================>
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const { devices, setDevices } = useVideoDeviceList();
  const [devices, setDevices] = useState<MediaDeviceInfo[] | []>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  //ここにvideo,image,canvasの文字列でモードを分ける
  const [mode, setMode] = useState("video");
  const [image, setImage] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  const [cordinatesDisplay, setCordinatesDisplay] = useState(true);
  const [points, setPoints] = useState(dammyPoints);
  const [totalCounts, setTotalCounts] = useState<number[]>([]);
  const [pointSize, setPointSize] = useState(10);
  const [cameraCheck, setCameraCheck] = useState(false);

  //<==================================hooks

  //カメラデータの取得
  // useEffect(() => {
  //   if (devices && devices.length > 0) {
  //     setSelectedDevice(devices[0].deviceId);
  //     setMode("video");
  //   }
  // }, [devices]);
  console.log(size);

  return (
    <main>
      <Header
        devices={devices}
        selectedDevice={selectedDevice}
        setMode={setMode}
        videoRef={videoRef}
        setSelectedDevice={setSelectedDevice}
        cameraCheck={cameraCheck}
        setCameraCheck={setCameraCheck}
        setSize={setSize}
      />
      <Container>
        <Wrapper>
          {cameraCheck && (
            <CameraSelect
              devices={devices}
              setDevices={setDevices}
              selectedDevice={selectedDevice}
              setSelectedDevice={setSelectedDevice}
            />
          )}
          {mode === "canvas" && (
            <PointSizeSlider
              pointSize={pointSize}
              setPointSize={setPointSize}
            />
          )}
          {mode === "canvas" && (
            <CordinatesButton
              cordinatesDisplay={cordinatesDisplay}
              setCordinatesDisplay={setCordinatesDisplay}
            />
          )}

          <MainImageDisplay
            videoRef={videoRef}
            canvasRef={canvasRef}
            mode={mode}
            setMode={setMode}
            image={image}
            setImage={setImage}
            size={size}
            setSize={setSize}
            cordinatesDisplay={cordinatesDisplay}
            setCordinatesDisplay={setCordinatesDisplay}
            points={points}
            setPoints={setPoints}
            pointSize={pointSize}
            cameraCheck={cameraCheck}
            selectedDevice={selectedDevice}
          />

          <div className="grid grid-cols-2 px-8">
            <AICountContent points={points} />
            {totalCounts.length > 0 && (
              <TotalCountResult totalCounts={totalCounts} />
            )}
          </div>
          {totalCounts.length > 0 && <CountResult totalCounts={totalCounts} />}
        </Wrapper>
      </Container>
      <Footer
        videoRef={videoRef}
        mode={mode}
        setMode={setMode}
        setImage={setImage}
        points={points}
        setPoints={setPoints}
        setTotalCounts={setTotalCounts}
      />
    </main>
  );
}

// const constraints = {
//   audio: false,
//   video: {
//     deviceId: getDevice ? getDevice.deviceId : undefined,
//     width: { ideal: 1280 }, // 画面の幅に合わせて設定
//     height: { ideal: 720 }, // 画面の高さに合わせて設定
//   },
// };

// const getPermission = async () => {
//   if (videoRef.current === null) return;
//   try {
//     // カメラ情報が取得できない場合はフロントカメラを利用する
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     if (videoRef.current) {
//       videoRef.current.srcObject = stream; // 新しいストリームで更新
//     }
//   } catch (err) {
//     console.error("Error", err);
//     alert("カメラ認証ができませんでした。");
//     // エラー処理、ユーザーにフィードバックを提供する
//   }
// };
