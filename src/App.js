import React, { useState } from 'react';
import axios from 'axios';
import Watermark from './components/Watermark';


function App() {
  const [image, setImage] = useState(null);
  const [isWatermarkVisible, setIsWatermarkVisible] = useState(false);

  // Download the image from the API and save it to a temporary file
  const imageUrl = "https://api.unsplash.com/photos/KR2mdHJ5qMg";
  const response = axios.get(imageUrl, { headers: { 'Authorization': 'Client-ID fhDwB0z_KpW2mQpxrrQmtaXEKE6IvZQqpU7kSOLILK8' } })
    .then(response => setImage(response.data.urls.regular));

  return (
    <div style={{ display: 'grid', gap: '40px', gridTemplateColumns: 'repeat(2, 1fr)', width: '400px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '20px' }}>
        <button
          style={{
            background: "#FFB266",
            border: "none",
            color: 'white',
            fontFamily: 'Poppins',
            width: '150px',
            height:'50px',
            marginTop: '10px',
            marginBottom: '10px',
            fontSize:'20px',
            borderRadius:'8px',
            fontWeight:'600',
            cursor:'pointer'
          }}
          onClick={() => {
            setIsWatermarkVisible(true)
          }
          }>
          Adauga Watermark
        </button>
        <img src={image} width={"700px"} />
      </div>
      {
        image && (
          <Watermark
            imageUrl={image}
            text="Compresia Datelor - Watermark"
            fontColor="#ffffff"
            fontSize="34px"
            opacity={0.5}
            isVisible={isWatermarkVisible}
          />
        )
      }

    </div >
  );
}

export default App;
