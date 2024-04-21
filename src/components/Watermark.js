import React, { useEffect, useRef, useState } from "react";
import { createCanvas } from 'canvas';
import CryptoJS from 'crypto-js'; // Asigură-te că ai importat CryptoJS

const Watermark = ({
                     imageUrl,
                     text,
                     logoUrl,
                     encryptionKey,
                     metadata,
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

        // Adăugarea textului watermark
        ctx.fillStyle = '#000000';
        ctx.font = '24px Arial';
        ctx.fillText(text, 10, 30);

        // Adăugarea logo-ului ca watermark
        if (logoUrl) {
          const logoImg = new Image();
          logoImg.crossOrigin = "anonymous";
          logoImg.src = logoUrl;
          logoImg.onload = () => {
            ctx.drawImage(logoImg, canvas.width - logoImg.width - 10, canvas.height - logoImg.height - 10);
          };
        }

        canvas.toBlob((blob) => {
          const imageWithMetadata = new Image();
          imageWithMetadata.src = URL.createObjectURL(blob);
          imageWithMetadata.onload = () => {
            console.log(metadata)
            const encryptedData = encryptData(JSON.stringify(metadata), encryptionKey);
            console.log(encryptedData);
            // Presupunem că metadata este un obiect care trebuie convertit într-un șir
            imageWithMetadata.metadata = encryptedData;
            setWatermarkImage(imageWithMetadata.src);
          };
        }, 'image/jpeg', 1);
      };
    }
  }, [imageUrl, text, logoUrl, metadata, encryptionKey]); // Actualizarea dependențelor pentru useEffect

  // Funcție pentru criptarea datelor
  const encryptData = (data, key) => {
    const encrypted = CryptoJS.AES.encrypt(data, key).toString();
    return encrypted;
  };

  return (
      <img
          ref={canvasRef}
          style={{ opacity: isVisible ? 1 : 0, marginTop: '70px' }}
          src={watermarkImage}
          width={"700px"}
          alt=""
      />
  );
};

export default Watermark;
