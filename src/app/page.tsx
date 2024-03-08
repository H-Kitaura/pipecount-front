"use client";
import { useEffect, useRef, useState } from "react";
import AICountContent from "./components/AICountContent";
import Container from "./components/Container";
import FixedCountContent from "./components/FixedCountContent";
import MainImageDisplay from "./components/MainImageDisplay";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useVideoDeviceList } from "./Hooks/useVideoDeviceList";
import CordinatesButton from "./components/button/CordinatesButton";
import { dammyPoints } from "./dammyData";

export default function Home() {
  //hooks=======================================>
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { devices } = useVideoDeviceList();
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  //ここにvideo,image,canvasの文字列でモードを分ける
  const [mode, setMode] = useState("");
  const [image, setImage] = useState("");
  // const [size, setSize] = useState({
  //   width: 300,
  //   height: 400,
  // });
  const [size, setSize] = useState({
    width: 300,
    height: 225,
  });
  const [cordinatesDisplay, setCordinatesDisplay] = useState(true);
  const [points, setPoints] = useState(dammyPoints);

  //<==================================hooks
  const getDevice =
    devices &&
    selectedDevice &&
    devices.find((v) => v.label === selectedDevice);

  useEffect(() => {
    const getPermission = async () => {
      try {
        // カメラ情報が取得できない場合はフロントカメラを利用する
        const constraints = getDevice
          ? { audio: false, video: { deviceId: getDevice.deviceId } }
          : { audio: false, video: { facingMode: "user" } };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef?.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error", err);
        // エラー処理、ユーザーにフィードバックを提供する
      }
    };

    getPermission();
  }, [getDevice, selectedDevice, mode, size]);
  //カメラデータの取得
  useEffect(() => {
    if (devices && devices.length > 0) {
      // devices[0] が MediaDeviceInfo オブジェクトであり、その deviceId プロパティを setSelectedDevice に渡す
      setSelectedDevice(devices[0].deviceId);
      setMode("video");
    }
  }, [devices, size]);
  console.log(size);
  console.log("洗濯中のデバイス", selectedDevice);
  console.log("デバイスたち", devices);

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

          <MainImageDisplay
            videoRef={videoRef}
            canvasRef={canvasRef}
            mode={mode}
            setMode={setMode}
            image={image}
            setImage={setImage}
            size={size}
            cordinatesDisplay={cordinatesDisplay}
            setCordinatesDisplay={setCordinatesDisplay}
            points={points}
            setPoints={setPoints}
          />
          <>
            <AICountContent points={points} />
            {/* <FixedCountContent
              // countData={countData}
              // setCountData={setCountData}
              points={points}
              setPoints={setPoints}
            /> */}
          </>
        </Wrapper>
      </Container>
      <Footer
        videoRef={videoRef}
        mode={mode}
        setMode={setMode}
        setImage={setImage}
      />
    </main>
  );
}
