import  { useState, useEffect } from 'react';
import { getAllUsers } from '../helper/helper';
import { Link } from 'react-router-dom';

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

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl mt-8 p-4">
      <h2 className="text-2xl font-semibold">All Users</h2>
      <ul className="mt-4">
        {users.map((user) => (
          <li key={user._id} className="mb-2">
            <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-gray-600">{`Email: ${user.email}`}</p>
            <p className="text-gray-600">{`Role: ${user.role}`}</p>
          </li>
        ))}
        <Link to={"/profile"}>Go back</Link>
      </ul>
    </div>
  );
};

export default AllUsers;
