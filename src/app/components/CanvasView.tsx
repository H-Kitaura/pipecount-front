import React, { useEffect, useState } from "react";
import { dammyPoints } from "@/app/dammyData";
import { Annotation } from "../schemas/type";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  size: any;
  cordinatesDisplay: boolean;
  setCordinatesDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  pointSize: number;
  annotation: Annotation;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
};

const CanvasView = ({
  canvasRef,
  size,
  cordinatesDisplay,
  setCordinatesDisplay,
  pointSize,
  annotation,
  setAnnotation,
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

  //canvasの再描画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    draw();
  }, [canvasRef, cordinatesDisplay, annotation, pointSize, size]);

  const drawPoint = (ctx: CanvasRenderingContext2D) => {
    annotation.points.forEach((pointPair: any) => {
      const { start, end } = pointPair;
      // 保存された座標をスケーリング
      const centerX = (start.x + end.x) / 2;
      const centerY = (start.y + end.y) / 2;
      // スケーリングされた座標で円を描画
      ctx.beginPath();
      ctx.arc(centerX, centerY, pointSize, 0, Math.PI * 2);
      ctx.strokeStyle = "#00FF00";
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
        ctx.clearRect(0, 0, size.width, size.height);
        ctx.drawImage(canvasImage, 0, 0, size.width, size.height);
        resolve(true);
      };
      canvasImage.onerror = reject;
      canvasImage.src = annotation.imageBase64;
    });
  };
  // const imageDraw = (
  //   canvas: HTMLCanvasElement,
  //   ctx: CanvasRenderingContext2D
  // ) => {
  //   return new Promise((resolve, reject) => {
  //     const canvasImage = new Image();
  //     canvasImage.onload = () => {
  //       // キャンバスのサイズを取得
  //       const canvasWidth = canvas.width;
  //       const canvasHeight = canvas.height;

  //       // 画像のアスペクト比に基づいて描画サイズを計算
  //       const imgAspectRatio = canvasImage.width / canvasImage.height;
  //       const canvasAspectRatio = canvasWidth / canvasHeight;

  //       let renderWidth, renderHeight;
  //       if (imgAspectRatio < canvasAspectRatio) {
  //         renderHeight = canvasHeight;
  //         renderWidth = canvasImage.width * (renderHeight / canvasImage.height);
  //       } else {
  //         renderWidth = canvasWidth;
  //         renderHeight = canvasImage.height * (renderWidth / canvasImage.width);
  //       }

  //       // キャンバスの中央に画像を配置
  //       const offsetX = (canvasWidth - renderWidth) / 2;
  //       const offsetY = (canvasHeight - renderHeight) / 2;

  //       ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //       ctx.drawImage(canvasImage, offsetX, offsetY, renderWidth, renderHeight);
  //       resolve(true);
  //     };
  //     canvasImage.onerror = reject;
  //     canvasImage.src = image;
  //   });
  // };

  useEffect(() => {
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // let windowRatio = window.innerWidth / window.innerHeight;
    // let imageRatio = size.width / size.height;
    // if (windowRatio > imageRatio) {
    //   canvas.width = size.height * windowRatio;
    //   canvas.height = size.height;
    // } else {
    //   canvas.width = size.width;
    //   canvas.height = size.width / windowRatio;
    // }
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
      const selectedPoint = annotation.points.find((point: any) => {
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
        const updatedPoints = annotation.points.filter(
          (point: any) => point !== selectedPoint
        );

        setAnnotation((prev) => ({
          ...prev,
          points: updatedPoints,
        }));
      } else {
        //なければ追加
        await drawAddArc(ctx, centerX, centerY);
        if (annotation.points === null) return;
        const newPoint = {
          id: annotation.points.length + 1,
          start: { x: startX, y: startY },
          end: { x: endX, y: endY },
          labelId: 0,
          score: null,
        };

        // setPoints([...points, newPoint]);
        setAnnotation((prev) => ({
          ...prev,
          points: [...prev.points, newPoint],
        }));
      }
    };
    canvas.addEventListener("mousedown", handleMouseDown);
    // イベントリスナーのクリーンアップ
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isDrawing, annotation, size]);
  function drawAddArc(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // const pointSize = 3;
    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, Math.PI * 2);
    ctx.strokeStyle = "#00FF00";
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
        width={size.width}
        height={size.height}
        // style={{ width: `${size}px`, height: `${size}px` }}
      ></canvas>
    </div>
  );
};

export default CanvasView;
