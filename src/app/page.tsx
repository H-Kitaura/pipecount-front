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

export default function Home() {
  //hooks=======================================>
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { devices } = useVideoDeviceList();
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  //ここにvideo,image,canvasの文字列でモードを分ける
  const [mode, setMode] = useState("");
  const [image, setImage] = useState("");
  const [size, setSize] = useState({
    width: 400,
    height: 300,
  });
  //<==================================hooks
  const getDevice =
    devices &&
    selectedDevice &&
    devices.find((v) => v.label === selectedDevice);

  useEffect(() => {
    // カメラ情報が取得できない場合はフロントカメラを利用する
    const constraints = getDevice
      ? { video: { deviceId: getDevice.deviceId } }
      : { video: { facingMode: "user" } };

    selectedDevice &&
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (videoRef?.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error", err);
        });
  }, [getDevice, selectedDevice, mode, size]);

  //カメラデータの取得
  useEffect(() => {
    if (devices && devices.length > 0) {
      // devices[0] が MediaDeviceInfo オブジェクトであり、その deviceId プロパティを setSelectedDevice に渡す
      setSelectedDevice(devices[0].deviceId);
      setMode("video");
    }
  }, [devices, size]);
  // ビデオ要素の参照またはカメラストリームからサイズを取得
  const updateVideoSize = () => {
    const videoWidth = videoRef.current?.videoWidth;
    const videoHeight = videoRef.current?.videoHeight;
    if (videoWidth && videoHeight) {
      setSize({ width: videoWidth, height: videoHeight });
    }
  };
  console.log(size);

  return (
    <main>
      <Header devices={devices} setSelectedDevice={setSelectedDevice} />
      <Container>
        <Wrapper>
          <MainImageDisplay
            videoRef={videoRef}
            canvasRef={canvasRef}
            mode={mode}
            setMode={setMode}
            image={image}
            setImage={setImage}
            size={size}
          />
          <AICountContent />
          <FixedCountContent />
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
