import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
        console.log(response.data);
        setAdminPosts(response.data.posts);
        setAdminUser(response.data.user);

      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminPosts();
  }, [userId]);


  return (
    <div>
      <h1>Posts by Admin</h1>
      {adminPosts.map((post) => (
        <PostCard key={post._id} user={adminUser} {...post} />
      ))}
    </div>
  );
};

export default AdminPosts;
