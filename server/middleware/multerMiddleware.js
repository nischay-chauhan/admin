import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit
  },
});

const cloudinaryUpload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.buffer.toString('base64'), {
      resource_type: 'auto',
    });
    console.log(result);
    return result.secure_url;
  } catch (error) {
    throw new Error('Error uploading image to Cloudinary');
  }
};

export { upload, cloudinaryUpload };

