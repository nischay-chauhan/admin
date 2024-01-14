import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../helper/helper';
import { Link } from 'react-router-dom';
import {Toaster} from "react-hot-toast"
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAllUsers = async () => {
      try {
        const response = await getAllUsers(token);
        setUsers(response.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching all users:', error.message);
      }
    };

    fetchAllUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await deleteUser(userId, token);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl mt-8 p-4 rounded-md">
      <Toaster />
      <h2 className="text-3xl font-semibold mb-4">All Users</h2>
      <h2 className='text-red-500 font-bold mb-4'>Keep in mind Admins cannot delete Admins </h2>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            className="mb-4 p-4 bg-gray-100 rounded-md transition-transform transform hover:scale-105 hover:shadow-md"
          >
            <p className="font-bold text-xl">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-gray-600">
              Email: <Link className="text-blue-500" to={`mailto:${user.email}`} target="_blank">{user.email}</Link>
            </p>
            <p className="text-gray-600">{`Role: ${user.role}`}</p>
            {user.role !== 'admin' && (  
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
      <Link to="/profile">
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
          Go back
        </button>
      </Link>
    </div>
  );
};

export default AllUsers;
