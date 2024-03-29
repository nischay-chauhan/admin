import { useFormik } from 'formik';
import { login } from '../helper/helper';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};

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
      }

      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const response = await login(values);
        console.log("after login response : ",response);
        const { token, user } = response;
        console.log(token, user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login successful');
        navigate('/profile');
      } catch (error) {
        console.error('Login failed', error.message);
        toast.error('Login failed');
      }
    },
  });



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <Toaster />
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md md:w-96 lg:w-1/2 xl:w-1/3">
        <form onSubmit={formik.handleSubmit} className="mt-8">
          <h1 className="text-4xl text-center font-bold mb-6 text-bold">LOGIN PAGE</h1>
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
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full md:w-auto"
            >
              Login
            </button>
            <Link to="/register" className=" ml-4 text-blue-500 mt-2">
              dont have an account?
            </Link>
            <Link to={"/forgotpassword"} className=" ml-4 block text-center text-blue-500 mt-2">
              forgot password?
            </Link>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;