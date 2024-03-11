import React from "react";

type Props = {
  pointSize: number;
  setPointSize: React.Dispatch<React.SetStateAction<number>>;
};

const PointSizeSlider = ({ pointSize, setPointSize }: Props) => {
  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 入力された値を数値に変換します
    const newZoomLevel = Number(event.target.value);
    setPointSize(newZoomLevel);
  };

  return (
    <div className="py-1 w-full flex items-center px-4 mt-2">
      <p className="mx-2">ポイント: {pointSize.toFixed(1)}</p>
      <input
        type="range"
        className="w-2/3 mx-auto"
        min="1" // 最小ズームレベル
        max="10" // 最大ズームレベル
        step="1" // スライダーの移動量
        value={pointSize} // 現在のズームレベル
        onChange={handleZoomChange} // 値が変わったときの処理
      />
    </div>
  );
};

export default PointSizeSlider;
