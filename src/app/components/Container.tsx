import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="h-full max-w-sm w-full mx-auto ">{children}</div>;
};

export default Container;
