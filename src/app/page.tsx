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

  useEffect(() => {
    let previousWidth = window.innerWidth;
    let previousHeight = window.innerHeight;

    const getPermission = async () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      const constraints = {
        audio: false,
        video: {
          deviceId: getDevice ? getDevice.deviceId : undefined,
          width: { ideal: isLandscape ? 1280 : 720 },
          height: { ideal: isLandscape ? 720 : 1280 },
        },
      };

      if (videoRef.current === null) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error", err);
        alert("カメラ認証ができませんでした。");
      }
    };

    const handleResize = () => {
      if (
        previousWidth === window.innerWidth &&
        previousHeight === window.innerHeight
      ) {
        return;
      }

      previousWidth = window.innerWidth;
      previousHeight = window.innerHeight;

      getPermission();
    };

    window.addEventListener("resize", handleResize);
    getPermission();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getDevice, selectedDevice, mode, devices, videoRef]);

  //カメラデータの取得
  useEffect(() => {
    if (devices && devices.length > 0) {
      // devices[0] が MediaDeviceInfo オブジェクトであり、その deviceId プロパティを setSelectedDevice に渡す
      setSelectedDevice(devices[0].deviceId);
      setMode("video");
    }
  }, [devices]);

  //videoの解像度とサイズを取得
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (videoRef.current) {
  //       setSize({
  //         width: window.innerWidth,
  //         height: window.innerHeight,
  //       });
  //     }
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // console.log("解像度", size);

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
