import  { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

const Info = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Post Information</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className='p-4 mb-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {posts.map((post) => (
            <PostCard
              key={post._id}
              author={post.author}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
            />
          ))}
        </div>
        <Link className='text-blue-500 ' to={'/profile'}>Go back to Profile </Link>
        </div>
      )}
  
    </div>
  );
};

export default Info;
