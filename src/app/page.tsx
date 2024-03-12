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

export default function Home() {
  //hooks=======================================>
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { devices } = useVideoDeviceList();
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  //ここにvideo,image,canvasの文字列でモードを分ける
  const [mode, setMode] = useState("");
  const [image, setImage] = useState("");
  // const [size, setSize] = useState({ width: 1280, height: 720 });
  const [size, setSize] = useState({ width: 0, height: 0 });

  const [cordinatesDisplay, setCordinatesDisplay] = useState(true);
  const [points, setPoints] = useState(dammyPoints);
  const [totalCounts, setTotalCounts] = useState<number[]>([]);
  const [pointSize, setPointSize] = useState(10);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  //<==================================hooks
  //スマホではこちら-----v
  const getDevice =
    devices &&
    selectedDevice &&
    devices.find((v) => v.label === selectedDevice);
  //PCではこちら-----v
  // const getDevice =
  //   devices &&
  //   selectedDevice &&
  //   devices.find((v) => v.deviceId === selectedDevice);

  const getPermission = async () => {
    if (videoRef.current === null) return;
    try {
      // カメラ情報が取得できない場合はフロントカメラを利用する
      // const constraints = getDevice
      //   ? {
      //       audio: false,
      //       video: {
      //         deviceId: getDevice.deviceId,
      //         width: { ideal: 1280 },
      //         height: { ideal: 720 },
      //       },
      //     }
      //   : {
      //       audio: false,
      //       video: {
      //         facingMode: "user",
      //         width: { ideal: 1280 },
      //         height: { ideal: 720 },
      //       },
      //     };
      const isLandscape = window.innerWidth > window.innerHeight;
      const constraints = {
        audio: false,
        video: {
          deviceId: getDevice ? getDevice.deviceId : undefined,
          width: { ideal: isLandscape ? 1280 : 720 },
          height: { ideal: isLandscape ? 720 : 1280 },
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      // videoRef.current.srcObject = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // 新しいストリームで更新
      }
      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();
      if (settings.width && settings.height)
        setSize({ width: settings.width, height: settings.height });
    } catch (err) {
      console.error("Error", err);
      alert("カメラ認証ができませんでした。");
      // エラー処理、ユーザーにフィードバックを提供する
    }
  };

  useEffect(() => {
    if (!videoRef.current && mode !== "video") return;
    getPermission();
  }, [getDevice, selectedDevice, mode, videoRef, devices, canvasRef]);
  // console.log("video", videoRef.current);

  //カメラデータの取得
  useEffect(() => {
    if (devices && devices.length > 0) {
      // devices[0] が MediaDeviceInfo オブジェクトであり、その deviceId プロパティを setSelectedDevice に渡す
      setSelectedDevice(devices[0].deviceId);
      setMode("video");
    }
  }, [devices]);
  useEffect(() => {
    function handleResize() {
      // setWindowSize({
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // });
    }
    handleResize();
    getPermission();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("video", videoRef.current);
  // console.log("image", image);
  console.log("canvas", canvasRef.current);

  return (
    <main>
      <Header devices={devices} setSelectedDevice={setSelectedDevice} />
      <Container>
        <Wrapper>
          {mode === "canvas" && (
            <CordinatesButton
              cordinatesDisplay={cordinatesDisplay}
              setCordinatesDisplay={setCordinatesDisplay}
            />
          )}
          {mode === "canvas" && (
            <PointSizeSlider
              pointSize={pointSize}
              setPointSize={setPointSize}
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
            windowSize={windowSize}
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
