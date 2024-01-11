import { Link } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import { getAdminProfile, getUserProfile, updateUserProfile } from "../helper/helper";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

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

  const handleEditClick = () => {
    setEditMode(true);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await updateUserProfile(formData, token);
  
      if (user.role === 'admin') {
        fetchAdminProfile(token);
      } else {
        fetchUserProfile(token);
      }
  
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl mt-8 p-4">
      <div className="md:flex">
        <div className="p-4">
          {!editMode ? (
            <>
              <h2 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Role: {user.role}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={handleEditClick}
              >
                Edit Details
              </button>
              {user.role === 'admin' && (
                <Link  to="/getAllusers" className="text-blue-500 ml-4 hover:underline mt-2">
                  See All Users
                </Link>
              )}
            </>
          ) : (
            <>
              <label className="block">
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full"
                />
              </label>
              <label className="block mt-4">
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full"
                />
              </label>
              <label className="block mt-4">
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full"
                />
              </label>
              <div className="mt-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
