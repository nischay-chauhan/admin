import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from './PostCard';

const AdminPosts = () => {
  const { userId } = useParams();
  const [adminPosts, setAdminPosts] = useState([]);
  const [adminUser, setAdminUser] = useState({});

  useEffect(() => {
    const fetchAdminPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${userId}/posts`);
        setAdminPosts(response.data.posts);
        setAdminUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminPosts();
  }, [userId]);

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-semibold mb-4'>Posts by Specific Admin</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {adminPosts.map((post) => (
          <PostCard key={post._id} user={adminUser} {...post} />
        ))}
      </div>
      <Link to='/info' className='inline-block text-blue-500 mt-4'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
          View All Posts
        </button>
      </Link>
    </div>
  );
};

export default AdminPosts;
