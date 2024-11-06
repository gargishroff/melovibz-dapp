// src/utils/ipfsUtils.js
import axios from 'axios';

export const uploadToPinata = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
                'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
        throw error;
    }
};
