import React, { useState } from 'react';
import axios from 'axios';

const CloudinaryUpload = ({ handleUploadedUrl }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);


        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dddyemhaw/image/upload`,
                formData,
                {

                    params: {
                        upload_preset: 'pawhmucq' // Replace 'your_upload_preset_name' with your actual upload preset name
                    },

                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                }
            );

            if (response.data && response.data.secure_url) {
                handleUploadedUrl(response.data.secure_url);
            }
        } catch (error) {
            console.error('Error uploading file: ', error);
        }
    };

    return (
        <div>
            <input type="file" className='form-control' onChange={handleFileChange} />
            <button onClick={handleUpload} className='btn btn-primary' type='button'>Upload</button>
        </div>
    );
};

export default CloudinaryUpload;
