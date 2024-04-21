import React, { useEffect, useState } from "react";

const Watermark = ({
                     imageUrl,
                     text,
                     logoUrl,
                     encryptionKey,
                     metadata,
                     isVisible,
                   }) => {
  const [watermarkImage, setWatermarkImage] = useState("");

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";  // This is necessary to handle CORS when loading images from external URLs
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Add text watermark
        ctx.fillStyle = '#000000';  // Set text color
        ctx.font = '24px Arial';    // Set font size and type
        ctx.fillText(text, 10, 30); // Position text in the canvas

        // Conditionally add a logo watermark if a URL is provided
        if (logoUrl) {
          const logoImg = new Image();
          logoImg.crossOrigin = "anonymous";
          logoImg.src = logoUrl;
          logoImg.onload = () => {
            // Draw logo at bottom-right corner, adjust positioning as needed
            ctx.drawImage(logoImg, canvas.width - logoImg.width - 10, canvas.height - logoImg.height - 10);
            finishUp();
          };
        } else {
          finishUp();
        }

        function finishUp() {
          canvas.toBlob((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            setWatermarkImage(imageUrl);
          }, 'image/jpeg');
        }
      };
    }
  }, [imageUrl, text, logoUrl, metadata, encryptionKey]); // Ensure all dependencies are listed here

  if (!isVisible) {
    return null;
  }

  return (
      <img src={watermarkImage} alt="Watermarked Image" style={{ marginTop: '20px', maxWidth: '700px' }} />
  );
};

export default Watermark;
