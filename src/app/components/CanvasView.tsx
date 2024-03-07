import React, { useEffect } from "react";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  image: string;
  size: any;
};

const CanvasView = ({ canvasRef, image, size }: Props) => {
  const draw = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasImage = new Image();
    canvasImage.onload = () => {
      ctx.clearRect(0, 0, size.width, size.height);
      // ctx.drawImage(canvasImage, 0, 0, 400, 300);
      ctx.drawImage(canvasImage, 0, 0, size.width, size.height);
    };
    canvasImage.src = image;
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    console.log(canvas);
    draw();
  }, [canvasRef, image]);

  return (
    <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
  );
};

export default CanvasView;
