"use client";

import Webcam from "react-webcam";
import { useRef } from "react";

export default function AdminCameraCapture({
  onCapture,
}) {

  const webcamRef = useRef(null);

  const capture = () => {

    const imageSrc =
      webcamRef.current
      ?.getScreenshot();

    onCapture(imageSrc);
  };

  return (
    <div className="space-y-4">

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="
          rounded-2xl
          w-full
        "
      />

      <button
        onClick={capture}
        className="
          bg-black
          text-white
          px-5
          py-3
          rounded-xl
        "
      >
        Capture Photo
      </button>

    </div>
  );
}