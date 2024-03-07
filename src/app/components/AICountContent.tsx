import React from "react";

type Props = {
  countData: number;
};

const AICountContent = ({ countData }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center my-4">
      <p className="mb-2">カウントした数</p>
      <p className="border py-2 px-9 shadow-md">{countData}</p>
    </div>
  );
};

export default AICountContent;
