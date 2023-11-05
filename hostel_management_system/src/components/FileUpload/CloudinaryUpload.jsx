import React, { useState } from 'react';
import axios from 'axios';

const CloudinaryUpload = () => {
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
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest',
          },
        }
      );

      console.log(response.data);
      // Handle response as needed (e.g., set image URL in state)
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
