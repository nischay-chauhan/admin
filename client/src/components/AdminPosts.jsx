import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostCard from './PostCard';
import { fetchAdminPosts } from '../helper/helper';

const AdminPosts = () => {
  const { userId } = useParams();
  const [adminPosts, setAdminPosts] = useState([]);

  useEffect(() => {
    fetchAdminPosts(userId, setAdminPosts);
  }, [userId]);

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-semibold mb-4'>Posts by Specific Admin</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {adminPosts.map((post) => (
          <PostCard key={post._id} {...post} />
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