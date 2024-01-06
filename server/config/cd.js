// In Connectcd.js
const Connectcd = async () => {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        secure: true,
      });
    } catch (error) {
      console.error('Error connecting to Cloudinary:', error);
    }
  };
  
export default Connectcd