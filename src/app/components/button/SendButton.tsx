import { Annotation, Feedback } from "@/app/schemas/type";
import { style } from "@/app/styles/style";
import axios from "axios";
import React from "react";

type Props = {
  setMode: React.Dispatch<React.SetStateAction<string>>;
  annotation: Annotation;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedBack: React.Dispatch<React.SetStateAction<Feedback>>;
};

const SendButton = ({
  setMode,
  annotation,
  setAnnotation,
  setLoading,
  setFeedBack,
}: Props) => {
  const fetchPointData = async (annotation: Annotation) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/pred/analysis`,
        annotation,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      return data; // This would be your fetched data
    } catch (error) {
      console.error("Error fetching point data:", error);
      return null; // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };
  const handleImage = async () => {
    const data = await fetchPointData(annotation);
    const updatedAnnotation = {
      ...annotation, // 既存のアノテーションデータをコピー
      points: data, // 新しいポイントデータを設定
    };
    setAnnotation(updatedAnnotation);
    setFeedBack((prev) => ({
      ...prev,
      before: updatedAnnotation,
    }));
    setMode("canvas");
  };

  return (
    <button
      onClick={handleImage}
      className={`${style.buttonLayout} py-2 px-4 w-1/2 `}
    >
      送信
    </button>
  );
};

export default SendButton;
