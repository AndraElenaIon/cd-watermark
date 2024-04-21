import React, { useEffect, useRef, useState } from "react";
import { createCanvas } from 'canvas';

const Watermark = ({
  imageUrl,
  text,
  fontColor,
  fontSize,
  opacity,
  isVisible,
}) => {
  const canvasRef = useRef(null);
  const [watermarkImage, setWatermarkImage] = useState("");

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      img.onload = () => {
        const canvas = createCanvas(400, 400);
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        ctx.fillStyle = fontColor;
        ctx.font = `${fontSize} sans-serif`;

        const x = img.width / 2 - ctx.measureText(text).width ;
        const y = img.height  - Number(fontSize.replace("px", "")) / 2;

        ctx.fillText(text, x, y);  

        const dataUrl = canvas.toDataURL("image/jpeg", opacity);
        setWatermarkImage(dataUrl);
      };
    }
  }, []);

  return (
    <img
      ref={canvasRef}
      style={{ opacity: isVisible ? 1 : 0 , marginTop:'70px'}}
      src={watermarkImage}
      width={"700px"}
      alt=""
    />
  );
};

export default Watermark;
