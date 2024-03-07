import React, { useEffect } from "react";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

const MainImageDisplay = ({ videoRef }: Props) => {
  // const draw = () => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;
  // };

  // useEffect(() => {
  //   draw();
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="h-[400px] w-[400px] border shadow-md flex items-center justify-center">
        <video ref={videoRef} autoPlay muted playsInline />
      </div>
    </div>
  );
};

export default MainImageDisplay;
