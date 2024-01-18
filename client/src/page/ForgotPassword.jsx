import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { forgotPassword } from '../helper/helper';

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
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

      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const response = await forgotPassword(values.email)
        if (response.success) {
            toast.success("Reset password Link sent to your email address");
          } else {
            toast.error(response.message);
          }
      } catch (error) {
        console.error('Forgot Password failed', error.message);
        toast.error('Forgot Password failed');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <Toaster />
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md md:w-96 lg:w-1/2 xl:w-1/3">
        <form onSubmit={formik.handleSubmit} className="mt-8">
          <h1 className="text-4xl text-center font-bold mb-6 text-bold">Forgot Password</h1>
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
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full md:w-auto"
            >
              Reset Password
            </button>
            <Link to="/" className="ml-4 text-blue-500 mt-2">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
