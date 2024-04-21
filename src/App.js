import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Watermark from './components/Watermark';

function App() {
    const [image, setImage] = useState(null);
    const [isWatermarkVisible, setIsWatermarkVisible] = useState(false);
    const [encryptionKey, setEncryptionKey] = useState('');

    useEffect(() => {
        // Descarcă imaginea de la API și o salvează într-un fișier temporar
        const fetchImage = async () => {
            try {
                const imageUrl = "https://api.unsplash.com/photos/KR2mdHJ5qMg";
                const response = await axios.get(imageUrl, { headers: { 'Authorization': 'Client-ID fhDwB0z_KpW2mQpxrrQmtaXEKE6IvZQqpU7kSOLILK8' } });
                setImage(response.data.urls.regular);
            } catch (error) {
                console.error('Eroare la descărcarea imaginii:', error);
            }
        };

        fetchImage();

        // Generarea cheii de criptare
        generateEncryptionKey();
    }, []);

    // Funcția pentru generarea cheii de criptare
    const generateEncryptionKey = async () => {
        const key = await crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: 256,
            },
            true,
            ["encrypt", "decrypt"]
        );
        const exportedKey = await crypto.subtle.exportKey("raw", key);
        const keyHex = Array.from(new Uint8Array(exportedKey)).map(b => b.toString(16).padStart(2, '0')).join('');
        console.log('Key ' + keyHex)
        setEncryptionKey(keyHex);
    };

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
                        setIsWatermarkVisible(true);
                    }}
                >
                    Adaugă Watermark
                </button>
                <img src={image} width={"700px"} alt="Imagine" />
            </div>
            {
                image && isWatermarkVisible && (
                    <Watermark
                        imageUrl={image}
                        text="Compresia Datelor - Watermark"
                        fontColor="#ffffff"
                        fontSize="34px"
                        opacity={0.5}
                        isVisible={isWatermarkVisible}
                        encryptionKey={encryptionKey} // Folosirea cheii generate
                        metadata={{copyright: "COPYCEVA" }}
                    />
                )
            }
        </div>
    );
}

export default App;
