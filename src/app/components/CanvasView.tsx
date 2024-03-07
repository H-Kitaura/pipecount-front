import React, { useEffect } from "react";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  image: string;
};

const CanvasView = ({ canvasRef, image }: Props) => {
  const draw = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasImage = new Image();
    canvasImage.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.drawImage(canvasImage, 0, 0, 400, 300);
      ctx.drawImage(canvasImage, 0, 0, canvas.width, canvas.height);
    };
    canvasImage.src = image;
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    console.log(canvas);
    draw();
  }, [canvasRef, image]);

  return <canvas ref={canvasRef} width={400} height={300}></canvas>;
};

export default CanvasView;
