import { useFormik } from 'formik';
import axios from 'axios';
import { Toaster , toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Login = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3001/login', values);
        console.log(response.data); 
        toast.success('Login successful');
      } catch (error) {
        console.error('Login failed', error.message);
        toast.error('Login failed');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
    <Toaster />
      <div className="max-w-md mx-auto">
        <form onSubmit={formik.handleSubmit} className="mt-8 bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <Link to="/register" className="ml-2 text-blue-500">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
