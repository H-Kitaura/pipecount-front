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
  const videoRef = useRef<HTMLVideoElement>(null);
  const { devices } = useVideoDeviceList();
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
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
  }, [getDevice, selectedDevice]);

  // useEffect(() => {
  //   // 利用デバイスの初期設定
  //   devices && devices?.[0] && setSelectedDevice(devices[0]);
  // }, [devices]);

  return (
    <main>
      <Header devices={devices} setSelectedDevice={setSelectedDevice} />
      <Container>
        <Wrapper>
          <MainImageDisplay videoRef={videoRef} />
          <AICountContent />
          <FixedCountContent />
        </Wrapper>
      </Container>
      <Footer />
    </main>
  );
}
