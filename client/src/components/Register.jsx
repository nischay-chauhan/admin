import { useFormik } from 'formik';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import {Link} from "react-router-dom"
const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'user', 
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3001/register', values);
        console.log(response.data); 
        toast.success('Registration successful');
      } catch (error) {
        console.error('Registration failed', error.message);
        toast.error('Registration failed');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="max-w-md mx-auto">
        <form onSubmit={formik.handleSubmit} className="mt-8 bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              className="border rounded w-full py-2 px-3"
            />
          </div>
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
            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              onChange={formik.handleChange}
              value={formik.values.role}
              className="border rounded w-full py-2 px-3"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Register
            </button>
            <Link className='ml-4 text-blue-500' to='/'>Already registered </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
