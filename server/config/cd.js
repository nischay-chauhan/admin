import { v2 as cloudinary } from 'cloudinary';

const Connectcd = async () => {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
      secure: true,
    });
    console.log('Cloudinary connected successfully');
  } catch (error) {
    console.error('Error connecting to Cloudinary:', error.message);
  }
};

export default Connectcd;
