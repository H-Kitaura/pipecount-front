import React from "react";

type Props = {
  points: any;
};

const AICountContent = ({ points }: Props) => {
  return (
    <div className="my-4">
      <p className="mb-2 text-lg font-semibold">カウント</p>
      <p className="text-4xl font-bold leading-none">{points.length}</p>
    </div>
  );
};

export default AICountContent;
