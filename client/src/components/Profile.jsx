import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

      if (userFromLocalStorage && userFromLocalStorage.role === 'admin') {
        fetchAdminProfile();
      } else {
        fetchUserProfile();
      }
    }
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error('Error fetching admin profile:', error.message);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setUser(response.data.user);
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
