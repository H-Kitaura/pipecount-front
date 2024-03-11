import React, { useEffect, useState } from "react";
import { dammyPoints } from "@/app/dammyData";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  image: string;
  size: any;
  cordinatesDisplay: boolean;
  setCordinatesDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  points: any;
  setPoints: React.Dispatch<React.SetStateAction<any>>;
  pointSize: number;
};

const CanvasView = ({
  canvasRef,
  image,
  size,
  cordinatesDisplay,
  setCordinatesDisplay,
  points,
  setPoints,
  pointSize,
}: Props) => {
  const [isDrawing, setIsDrawing] = useState(true);
  const draw = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    await imageDraw(canvas, ctx)
      .then(() => {
        if (cordinatesDisplay) {
          drawPoint(ctx, canvas);
        }
      })
      .catch((err) => {
        console.error("Image load error", err);
      });
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    draw();
  }, [canvasRef, image, cordinatesDisplay, points, pointSize]);

  const drawPoint = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    points.forEach((pointPair: any) => {
      const { start, end } = pointPair;

      // スケールファクターの計算
      const scaleX = canvas.clientWidth / size.width;
      const scaleY = canvas.clientHeight / size.height;

      // 保存された座標をスケーリング
      const centerX = (start.x + end.x) / 2;
      const centerY = (start.y + end.y) / 2;

      console.log(centerX, centerY);
      console.log(scaleX, scaleY);

      // スケーリングされた座標で円を描画
      ctx.beginPath();
      ctx.arc(centerX, centerY, pointSize, 0, Math.PI * 2);
      ctx.strokeStyle = "green";
      ctx.stroke();
      ctx.closePath();
    });
  };
  const imageDraw = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    return new Promise((resolve, reject) => {
      const canvasImage = new Image();
      canvasImage.onload = () => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(canvasImage, 0, 0, canvas.width, canvas.height);
        resolve(true);
      };
      canvasImage.onerror = reject;
      canvasImage.src = image;
    });
  };

  useEffect(() => {
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;
    // マウスダウンイベントで始点を設定
    const handleMouseDown = async (e: MouseEvent) => {
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.clientWidth / size.width;
      const scaleY = canvas.clientHeight / size.height;

      const centerX = (e.clientX - rect.left) / scaleX;
      const centerY = (e.clientY - rect.top) / scaleY;
      const sideLength = 20; // 四角形の一辺の長さ
      const adjustedSideLength = sideLength * Math.min(scaleX, scaleY);

      // 中心地からのオフセットを考慮して始点と終点を計算
      const startX = centerX - adjustedSideLength / 2;
      const startY = centerY - adjustedSideLength / 2;
      const endX = centerX + adjustedSideLength / 2;
      const endY = centerY + adjustedSideLength / 2;

      const selectedPoint = points.find(
        (point: any) =>
          centerX >= point.start.x &&
          centerX <= point.end.x &&
          centerY >= point.start.y &&
          centerY <= point.end.y
      );
      //クリックした座標が去れば削除
      if (selectedPoint) {
        const updatedPoints = points.filter(
          (point: any) =>
            !(
              centerX >= point.start.x &&
              centerX <= point.end.x &&
              centerY >= point.start.y &&
              centerY <= point.end.y
            )
        );
        setPoints(updatedPoints);
      } else {
        //なければ追加
        await drawAddArc(ctx, centerX, centerY);
        if (points === null) return;
        const newPoint = {
          start: { x: startX, y: startY },
          end: { x: endX, y: endY },
        };

        setPoints([...points, newPoint]);
      }
    };
    canvas.addEventListener("mousedown", handleMouseDown);
    // イベントリスナーのクリーンアップ
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isDrawing, points]);

  console.log(points);

  function drawAddArc(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // const pointSize = 3;
    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, Math.PI * 2);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  return (
    // <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
    <div className="h-full w-full flex items-center justify-center flex-col mt-8 mb-8">
      <canvas
        className="w-full h-auto"
        ref={canvasRef}
        width={size.width}
        height={size.height}
      ></canvas>
    </div>
  );
};

export default CanvasView;
