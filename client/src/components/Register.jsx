import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import {Link , useNavigate} from "react-router-dom"
import { register } from '../helper/helper';
const Register = () => {
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'user', 
      profilePicture: null,
    },
    validate: (values) => {
      const errors = {};

      if (!values.firstName) {
        errors.firstName = 'First name is required';
        toast.error('First name is required');
      }

      if (!values.lastName) {
        errors.lastName = 'Last name is required';
        toast.error('Last name is required');
      }

      if (!values.email) {
        errors.email = 'Email is required';
        toast.error('Email is required');
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
        toast.error('Invalid email address');
      }

      if (!values.password) {
        errors.password = 'Password is required';
        toast.error('Password is required');
      } else if (values.password.length < 5) {
        errors.password = 'Password must be at least 5 characters long';
        toast.error('Password must be at least 5 characters long');
      }

      return errors;
    },
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit: async (values) => {
      try {

        const response = await register(values)
        console.log(response);
        toast.success('Registration successful');
        Navigate('/');
      } catch (error) {
        console.error('Registration failed', error.message);
        toast.error('Registration failed');
      }
    },
  }
  );
  // const handleFileChange = (event) => {
  //   formik.setFieldValue('profilePicture', event.currentTarget.files[0]);
  // };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <Toaster />
      <div className="max-w-md mx-auto text-center mb-8">
        <h1 className="text-4xl text-white font-bold">Register</h1>
      </div>
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md md:w-96 lg:w-1/2 xl:w-1/3">
        <form onSubmit={formik.handleSubmit} className="mt-8">
          <div className="mb-6">
            <label htmlFor="firstName" className="block text-gray-700 text-lg font-bold mb-2">
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
          <div className="mb-6">
            <label htmlFor="lastName" className="block text-gray-700 text-lg font-bold mb-2">
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
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-lg font-bold mb-2">
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
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">
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
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700 text-lg font-bold mb-2">
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
          <div className="mb-6">
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
