import React, { useEffect } from "react";
import { dammyPoints } from "@/app/dammyData";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  image: string;
  size: any;
};

const CanvasView = ({ canvasRef, image, size }: Props) => {
  const [isDrawing, setIsDrawing] = React.useState(true);
  const [points, setPoints] = React.useState(dammyPoints);
  const draw = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    await imageDraw(ctx)
      .then(() => {
        drawPoint(ctx);
      })
      .catch((err) => {
        console.error("Image load error", err);
      });
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    console.log(canvas);

    draw();
  }, [canvasRef, image]);

  const drawPoint = (ctx: CanvasRenderingContext2D) => {
    points.forEach((pointPair) => {
      const { start, end } = pointPair;
      const width = end.x - start.x;
      const height = end.y - start.y;

      ctx.beginPath();
      ctx.rect(start.x, start.y, width, height);
      ctx.strokeStyle = "red";
      ctx.stroke();
      ctx.closePath();
    });
  };
  const imageDraw = (ctx: CanvasRenderingContext2D) => {
    return new Promise((resolve, reject) => {
      const canvasImage = new Image();
      canvasImage.onload = () => {
        ctx.clearRect(0, 0, size.width, size.height);
        ctx.drawImage(canvasImage, 0, 0, size.width, size.height);
        resolve(true);
      };
      canvasImage.onerror = reject;
      canvasImage.src = image;
    });
  };

  useEffect(() => {
    //追加ボタンを押していなかったらreturn
    if (
      // mode !== "add" ||

      canvasRef.current === null
    )
      return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;
    // マウスダウンイベントで始点を設定
    const handleMouseDown = async (e: MouseEvent) => {
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      const centerX = e.clientX - rect.left;
      const centerY = e.clientY - rect.top;
      const sideLength = 20; // 四角形の一辺の長さ

      // 中心地からのオフセットを考慮して始点と終点を計算
      const startX = centerX - sideLength / 2;
      const startY = centerY - sideLength / 2;
      const endX = centerX + sideLength / 2;
      const endY = centerY + sideLength / 2;
      // 矩形を描画
      await draw();
      await drawRect(ctx, centerX, centerY, sideLength, sideLength);
      if (points === null) return;
      const newPoint = {
        start: { x: startX, y: startY },
        end: { x: endX, y: endY },
      };
      setPoints([...points, newPoint]);
    };

    canvas.addEventListener("mousedown", handleMouseDown);

    // イベントリスナーのクリーンアップ
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isDrawing]);

  console.log(points);

  function drawRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    ctx.beginPath();
    ctx.rect(x - width / 2, y - height / 2, width, height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  return (
    <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
  );
};

export default CanvasView;
