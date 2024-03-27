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
import PointSizeSlider from "./components/PointSizeSlider";
import CountResult from "./components/CountResult";
import TotalCountResult from "./components/TotalCountResult";
import CameraSelect from "./components/CameraSelect";
import { Annotation, Feedback } from "./schemas/type";
import { ThreeCircles } from "react-loader-spinner";
import Login from "./components/Login";
import useUserFirstLogin from "./Hooks/useUserFirstLogin";

export default function Home() {
  //hooks=======================================>
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { devices, setDevices } = useVideoDeviceList();
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  //ここにvideo,image,canvasの文字列でモードを分ける
  const [mode, setMode] = useState("video");
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const [cordinatesDisplay, setCordinatesDisplay] = useState(true);
  const [totalCounts, setTotalCounts] = useState<number[]>([]);
  const [pointSize, setPointSize] = useState(10);
  const [cameraCheck, setCameraCheck] = useState(false);
  const [annotation, setAnnotation] = useState<Annotation>({
    points: [],
    imageBase64: "",
    imageFilename: null,
  });
  const [loading, setLoading] = useState(false);
  const [feedBack, setFeedBack] = useState<Feedback>({
    before: {
      points: [],
      imageBase64: "",
      imageFilename: null,
    },
    after: {
      points: [],
      imageBase64: "",
      imageFilename: null,
    },
  });
  const { userData, setUserData, isLoading } = useUserFirstLogin();

  //<==================================hooks

  //カメラデータの取得
  useEffect(() => {
    if (devices && devices.length > 0) {
      setSelectedDevice(devices[0].deviceId);
      setMode("video");
    }
  }, [devices]);

  console.log(devices);

  useEffect(() => {
    if (!cameraCheck) return;
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    });
  }, [cameraCheck]);

  // useEffect(() => {
  //   if (selectedDevice && cameraCheck) {
  //     getStream();
  //   }
  // }, [selectedDevice, cameraCheck]);
  // ^========================================変更しない

  useEffect(() => {
    if (!cameraCheck) return;
    const updateVideoResolution = async () => {
      // デバイスの向きに基づいて解像度の制約を設定
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const constraints = {
        video: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
          width: { ideal: isPortrait ? 1000 : 1000 },
          height: { ideal: isPortrait ? 1000 : 1000 },
        },
        audio: false,
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              setSize({
                width: videoRef.current.videoWidth,
                height: videoRef.current.videoHeight,
              });
            }
          };
        }
      } catch (err) {
        console.error("カメラへのアクセスに失敗しました: ", err);
      }
    };

    // オリエンテーションやリサイズイベントに基づいて解像度を更新
    window.addEventListener("orientationchange", updateVideoResolution);
    // resizeイベントも考慮する場合は追加（iPhoneでの誤検知に注意）
    // window.addEventListener("resize", updateVideoResolution);

    // 初期ロードとイベント発火時に実行
    updateVideoResolution();

    return () => {
      window.removeEventListener("orientationchange", updateVideoResolution);
      // window.removeEventListener("resize", updateVideoResolution);
    };
  }, [selectedDevice, cameraCheck, mode]);

  // const getStream = async () => {
  //   try {
  //     // デバイスの向きに基づいて適切な解像度を設定
  //     const isLandscape =
  //       window.screen.orientation.type.includes("landscape-primary") ||
  //       window.screen.orientation.type.includes("landscape-secondary");
  //     const constraints = {
  //       video: {
  //         deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
  //         width: { ideal: isLandscape ? 1000 : 1000 },
  //         height: { ideal: isLandscape ? 1000 : 1000 },
  //       },
  //       audio: false,
  //     };

  //     const stream = await navigator.mediaDevices.getUserMedia(constraints);
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = stream;
  //       videoRef.current.onloadedmetadata = () => {
  //         if (videoRef.current) {
  //           // ビデオの実際のサイズを基にサイズを設定
  //           setSize({
  //             width: videoRef.current.videoWidth,
  //             height: videoRef.current.videoHeight,
  //           });
  //         }
  //       };
  //     }
  //   } catch (err) {
  //     console.error("カメラへのアクセスに失敗しました: ", err);
  //   }
  // };
  //デバイスのidが一致しているものを見つけて取得する
  // const getDevice =
  //   devices &&
  //   selectedDevice &&
  //   devices.find((v: any) => v.deviceId === selectedDevice);

  console.log(feedBack);

  return (
    <main>
      <Header cameraCheck={cameraCheck} setCameraCheck={setCameraCheck} />
      <Container>
        <Wrapper>
          {cameraCheck && (
            <CameraSelect
              devices={devices}
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
          {loading ? (
            <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center modal-overlay z-50 opacity-70 bg-black">
              <div className="flex items-center justify-center h-[400px]">
                <div className="relative">
                  <ThreeCircles
                    innerCircleColor="#47A8BD" // 内側の円の色
                    middleCircleColor="#005D6E" // 中間の円の色
                    outerCircleColor="#003B46" // 外側の円の色
                  />
                  <p className="absolute -bottom-10 left-0 right-0 loadingText text-white z-40">
                    Loading...
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <MainImageDisplay
              videoRef={videoRef}
              canvasRef={canvasRef}
              mode={mode}
              setMode={setMode}
              size={size}
              cordinatesDisplay={cordinatesDisplay}
              setCordinatesDisplay={setCordinatesDisplay}
              pointSize={pointSize}
              cameraCheck={cameraCheck}
              annotation={annotation}
              setAnnotation={setAnnotation}
              setLoading={setLoading}
              setFeedBack={setFeedBack}
            />
          )}

          <div className="grid grid-cols-2 gap-2 px-4">
            <AICountContent annotation={annotation} />
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
        setTotalCounts={setTotalCounts}
        annotation={annotation}
        setAnnotation={setAnnotation}
        feedBack={feedBack}
        setFeedBack={setFeedBack}
      />
      {/* {isLoading && <Login />} */}
    </main>
  );
}
