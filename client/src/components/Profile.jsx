// Profile.jsx
import { useEffect, useState } from 'react';
import { getAdminProfile, getUserProfile } from "../helper/helper";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

      if (userFromLocalStorage && userFromLocalStorage.role === 'admin') {
        fetchAdminProfile(token);
      } else {
        fetchUserProfile(token);
      }
    }
  }, []);

  const fetchAdminProfile = async (token) => {
    try {
      const response = await getAdminProfile(token);
      setUser(response);
    } catch (error) {
      console.error('Error fetching admin profile:', error.message);
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await getUserProfile(token);
      setUser(response.user);
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  };

  if (!user) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl mt-8">
      <div className="md:flex">
        <div className="p-4">
          <h2 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Role: {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
