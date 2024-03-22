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
          drawPoint(ctx);
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
  console.log(points);

  const drawPoint = (ctx: CanvasRenderingContext2D) => {
    points.forEach((pointPair: any) => {
      const { start, end } = pointPair;
      // 保存された座標をスケーリング
      const centerX = (start.x + end.x) / 2;
      const centerY = (start.y + end.y) / 2;
      // スケーリングされた座標で円を描画
      ctx.beginPath();
      ctx.arc(centerX, centerY, pointSize, 0, Math.PI * 2);
      ctx.strokeStyle = "green";
      ctx.lineWidth = 10;

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
        ctx.clearRect(0, 0, size * 2, size * 2);
        ctx.drawImage(canvasImage, 0, 0, size * 2, size * 2);
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
      const scaleX = canvas.clientWidth / (size * 2);
      const scaleY = canvas.clientHeight / (size * 2);

      const centerX = (e.clientX - rect.left) / scaleX;
      const centerY = (e.clientY - rect.top) / scaleY;
      const sideLength = 20; // 四角形の一辺の長さ
      const adjustedSideLength = sideLength * Math.min(scaleX, scaleY);

      // 中心地からのオフセットを考慮して始点と終点を計算
      const startX = centerX - adjustedSideLength / 2;
      const startY = centerY - adjustedSideLength / 2;
      const endX = centerX + adjustedSideLength / 2;
      const endY = centerY + adjustedSideLength / 2;
      const selectedPoint = points.find((point: any) => {
        const pointCenterX = (point.start.x + point.end.x) / 2;
        const pointCenterY = (point.start.y + point.end.y) / 2;
        const distance = Math.sqrt(
          Math.pow(centerX - pointCenterX, 2) +
            Math.pow(centerY - pointCenterY, 2)
        );
        return distance < 2 * pointSize;
      });

      //クリックした座標が去れば削除
      if (selectedPoint) {
        const updatedPoints = points.filter(
          (point: any) => point !== selectedPoint
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
  function drawAddArc(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // const pointSize = 3;
    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, Math.PI * 2);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 10;
    ctx.stroke();
  }

  return (
    // <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
    <div className="h-full w-full flex items-center justify-center flex-col mt-8 mb-8">
      <canvas
        className="w-full h-auto "
        ref={canvasRef}
        // width={800}
        // height={800}
        width={size * 2}
        height={size * 2}
        style={{ width: `${size}px`, height: `${size}px` }}
      ></canvas>
    </div>
  );
};

export default CanvasView;
