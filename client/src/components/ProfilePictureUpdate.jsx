import { useState } from 'react';
import { updateProfilePicture } from '../helper/helper';
import {toast , Toaster} from "react-hot-toast"
import {useNavigate} from "react-router-dom"
const ProfilePictureUpdate = ({ userId }) => {
  const Navigate = useNavigate()
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleProfilePictureChange = (event) => {
    const selectedFile = event.target.files[0];
    setNewProfilePicture(selectedFile);
    console.log(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpdateProfilePicture = async () => {
    try {
      const response = await updateProfilePicture(userId, newProfilePicture);
      console.log(response);
      if (response.success == true) {
        toast.success("Profile Picture Updated Successfully");
        setTimeout(() => {
          Navigate('/profile');
        }, 500);
      } else {
        toast.error("Failed to update profile picture");

      }
    } catch (error) {
      console.error('Error updating profile picture:', error.message);
      toast.error("Failed to update profile picture");
    }
  };
  

  return (
    <div className="flex flex-col items-center space-y-4">
      <Toaster />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Profile Picture Preview"
          className="rounded-full h-32 w-32 object-cover"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePictureChange}
        className="border border-gray-300 p-2 rounded-md"
      />
      <button
        onClick={handleUpdateProfilePicture}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Update Profile Picture
      </button>
    </div>
  );
};

export default ProfilePictureUpdate;
