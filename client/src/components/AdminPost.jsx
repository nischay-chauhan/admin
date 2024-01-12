import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
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
            className={`form-input mt-1 outline bg-gray-100 block w-full ${
              formik.errors.title ? 'border-red-500' : ''
            }`}
          />
        </label>
        {formik.errors.title && (
          <p className="text-red-500 mt-1">{formik.errors.title}</p>
        )}
        
        <label className="block mt-4">
          Content:
          <textarea
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            className={`form-input mt-1 bg-gray-100 outline block w-full ${
              formik.errors.content ? 'border-red-500' : ''
            }`}
          />
        </label>
        {formik.errors.content && (
          <p className="text-red-500 mt-1">{formik.errors.content}</p>
        )}

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
