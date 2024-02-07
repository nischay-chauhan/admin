import { useParams } from 'react-router-dom';
import ProfilePictureUpdate from '../components/ProfilePictureUpdate';

const ProfilePictureUpdatePage = () => {
  const { userId } = useParams(); 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Update Profile Picture</h1>
      <ProfilePictureUpdate userId={userId} />
    </div>
  );
};

export default ProfilePictureUpdatePage;
