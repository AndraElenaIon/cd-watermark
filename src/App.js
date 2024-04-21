import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setFile(file);
            setImagePreviewUrl(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('image', file);
        formData.append('metadata', JSON.stringify({ author: "John Doe" }));

        axios.post('http://localhost:5000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'blob'  // Important: Response is a file
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                setImagePreviewUrl(url);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} />
                <button type="submit" onClick={handleSubmit}>Upload Image</button>
            </form>
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Uploaded Image" />}
        </div>
    );
}

export default App;
