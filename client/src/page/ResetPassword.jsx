import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import { useParams, Link ,useNavigate } from 'react-router-dom';
import { resetPassword } from '../helper/helper';


const ResetPassword = () => {
    const Navigate = useNavigate();
  const { userId, resetToken } = useParams();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.password) {
        errors.password = 'Password is required';
        toast.error('Password is required');
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        toast.error('Passwords do not match');
      }

      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
       
        const response = await resetPassword(userId, resetToken, values.password); 
        console.log(response);

        if (response.Status === "Success") {
          toast.success("SuccessFully Reseted Your Password");
          setTimeout(() => {
            Navigate('/');
          },500)
          
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Reset Password failed', error.message);
        toast.error('Reset Password failed');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <Toaster />
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md md:w-96 lg:w-1/2 xl:w-1/3">
        <form onSubmit={formik.handleSubmit} className="mt-8">
          <h1 className="text-4xl text-center font-bold mb-6 text-bold">Reset Password</h1>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">
              New Password
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
            <label htmlFor="confirmPassword" className="block text-gray-700 text-lg font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
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
            <Link to="/login" className="ml-4 text-blue-500 mt-2">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
