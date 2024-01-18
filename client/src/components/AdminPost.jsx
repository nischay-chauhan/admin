import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { createPost } from '../helper/helper';
const AdminPost = () => {
  const Navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.title.trim()) {
        errors.title = 'Title is required';
      }

      if (!values.content.trim()) {
        errors.content = 'Content is required';
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        const errors = formik.validateForm(values);

        if (Object.keys(errors).length > 0) {
          Object.values(errors).forEach((error) => toast.error(error));
          return;
        }
        await createPost(values, token);
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
    <div className="max-w-md min-h-full items-center justify-center mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl mt-8 p-4 rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">Create a New Post</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className={`form-input mt-1 p-2 w-full  bg-gray-100 rounded ${
              formik.errors.title ? 'border border-red-500' : ''
            }`}
          />
          {formik.errors.title && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Content:</label>
          <textarea
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            className={`form-input mt-1 p-2 w-full bg-gray-100  rounded ${
              formik.errors.content ? 'border border-red-500' : ''
            }`}
          />
          {formik.errors.content && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.content}</p>
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Create Post
          </button>
        </div>
      </form>
      <div className='text-center'>
           
              <Link className='text-blue-500 hover:underline' to={'/profile'}>Go back to profile</Link>
            
      </div>
    </div>
  );
};

export default AdminPost;
