import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminProfile, getUserProfile, updateUserProfile } from '../helper/helper';
import { useFormik } from 'formik';
import AdminPost from './AdminPost'; 
import {Toaster} from "react-hot-toast"
const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        await updateUserProfile(values, token);

        if (user.role === 'admin') {
          fetchAdminProfile(token);
        } else {
          fetchUserProfile(token);
        }

        setEditMode(false);
      } catch (error) {
        console.error('Error updating user profile:', error.message);
      }
    },
  });

  const handleEditClick = () => {
    setEditMode(true);
    formik.setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await handleLogout(token); 
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload(true);
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  if (!user) {
    return <div className=" text-center mt-8">
      LLoading error reaching... <Link className='text-blue-500 hover:underline' to='/'>Try loggin in again</Link>
      </div>;
  }

  return (
    <div>
      <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl mt-8 p-4">
        <div className="md:flex">
          <Toaster />
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
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <div className='flex flex-col '>
                {user.role === 'admin' && (
                  <div className='mt-2'>
                  <Link to="/getAllusers" className="text-blue-500 ml-4 hover:underline mt-2">
                    See All Users
                  </Link>
                  </div>
                )}
                <div className='mt-2'>
                <Link className='text-blue-500 ml-4 hover:underline' to={'/info'}>See all the Posts</Link>
                </div>
                </div>
              </>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <label className="block">
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    className="form-input mt-1 block w-full"
                  />
                </label>
                <label className="block mt-4">
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    className="form-input mt-1 block w-full"
                  />
                </label>
                <label className="block mt-4">
                  Email:
                  <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="form-input mt-1 block w-full"
                  />
                </label>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      {user.role === 'admin' && <AdminPost />} {/* Render AdminPost only if the user is an admin */}
    </div>
  );
};

export default Profile;
