import { useFormik } from 'formik';
import { toast} from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import { createPost } from '../helper/helper';
const AdminPost = () => {
  const Navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        await createPost(values , token);
        toast.success('Post created successfully');
        console.log('Post created successfully');
        Navigate('/info');
      } catch (error) {
        console.error('Error creating post:', error.message);
        toast.error('Error creating post');
      }
    },
  });

  return (
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl mt-8 p-4">
      <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
      <form onSubmit={formik.handleSubmit}>
        <label className="block">
          Title:
          <input
            type="text"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="form-input mt-1 outline bg-gray-100 block w-full"
          />
        </label>
        <label className="block mt-4">
          Content:
          <textarea
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            className="form-input mt-1 bg-gray-100 outline block w-full"
          />
        </label>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPost;
