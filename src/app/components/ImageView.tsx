import React from "react";
import { style } from "../styles/style";
import RetakephotoButton from "./button/RetakephotoButton";
import SendButton from "./button/SendButton";
import { Annotation, Feedback } from "../schemas/type";

type Props = {
  setMode: React.Dispatch<React.SetStateAction<string>>;
  size: any;
  annotation: Annotation;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedBack: React.Dispatch<React.SetStateAction<Feedback>>;
};

const ImageView = ({
  setMode,
  size,
  annotation,
  setAnnotation,
  setLoading,
  setFeedBack,
}: Props) => {
  const handleReset = () => {
    setMode("video");
    setAnnotation((prev) => ({
      ...prev,
      points: [],
      imageBase64: "",
    }));
  };

  if (annotation.imageBase64 === null) return;
  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <img
        src={annotation.imageBase64}
        // width={800}
        // height={800}
        // width={size.width}
        // height={size.height}
        className="w-full h-auto"
        alt="image"
      />
      <div className="flex items-center justify-center w-full space-x-4 my-4">
        <button
          onClick={handleReset}
          className={`${style.buttonLayout} w-1/2 flex items-center justify-center h-[40px]`}
        >
          <p className="text-center">再撮影</p>
        </button>
        <SendButton
          setMode={setMode}
          annotation={annotation}
          setAnnotation={setAnnotation}
          setLoading={setLoading}
          setFeedBack={setFeedBack}
        />
      </div>
    </div>
  );
};

export default ImageView;
