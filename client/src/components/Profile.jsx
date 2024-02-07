import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAdminProfile,
  getUserProfile,
  updateUserProfile,
} from "../helper/helper";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";

const Profile = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));

      if (userFromLocalStorage && userFromLocalStorage.role === "admin") {
        fetchAdminProfile(token);
      } else {
        fetchUserProfile(token);
      }
    }
  }, []);

  const fetchAdminProfile = async (token) => {
    try {
      const response = await getAdminProfile(token);
      setUser(response);
    } catch (error) {
      console.error("Error fetching admin profile:", error.message);
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await getUserProfile(token);
      setUser(response.user);
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      profilePicture: null,
    },
    validate: (values) => {
      const errors = {};
      if (!values.firstName.trim()) {
        errors.title = "firstname is required";
      }

      if (!values.lastName.trim()) {
        errors.content = "lastname is required";
      }

      if (!values.email.trim()) {
        errors.content = "email is required";
      }

      return errors;
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        await updateUserProfile(values, token);

        if (user.role === "admin") {
          fetchAdminProfile(token);
        } else {
          fetchUserProfile(token);
        }

        setEditMode(false);
      } catch (error) {
        console.error("Error updating user profile:", error.message);
      }
    },
  });

  const handleEditClick = () => {
    setEditMode(true);
    formik.setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await handleLogout(token);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };
  if (!user) {
    return (
      <div className="text-center mt-8">
        Loading error reaching...{" "}
        <Link className="text-blue-500 hover:underline" to="/">
          Try logging in again
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-xl mx-auto rounded flex justify-center items-center bg-white shadow-md overflow-hidden md:max-w-2xl mt-8 p-4">
        <div className="md:flex">
          <Toaster />
          <div className="p-4">
            {!editMode ? (
              <>
                <h2 className="text-2xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">Role: {user.role}</p>
                <p className="text-gray-600">Created at: {user.createdAt}</p>
                <div className="relative mt-4">
                  <img
                    src={user?.profilePicture}
                    alt={user.firstName}
                    className="rounded-full h-40 w-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full w-40 h-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                    <Link className="text-white" to={`/profile/${user._id}/update-picture`}>
                      Change Picture
                    </Link>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full md:w-auto mr-2"
                    onClick={handleEditClick}
                  >
                    Edit Details
                  </button>
                  {user.role === "admin" && (
                    <button
                      onClick={() => Navigate("/getAllusers")}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full md:w-auto mr-2"
                    >
                      See All Users
                    </button>
                  )}
                  <button
                    onClick={() => Navigate("/info")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full md:w-auto mr-2"
                  >
                    See all the Posts
                  </button>
                  {user.role === "admin" && (
                    <button
                      onClick={() => Navigate("/adminpost")}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full md:w-auto mr-2"
                    >
                      Make Post
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 w-full md:w-auto mr-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <label className="block">
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    className="form-input mt-1 block w-full"
                  />
                </label>
                <label className="block mt-4">
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    className="form-input mt-1 block w-full"
                  />
                </label>
                <label className="block mt-4">
                  Email:
                  <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="form-input mt-1 block w-full"
                  />
                </label>
                <label className="block mt-4">
                  Profile Picture:
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={(event) =>
                      formik.setFieldValue(
                        "profilePicture",
                        event.currentTarget.files[0]
                      )
                    }
                    className="form-input mt-1 block w-full"
                  />
                </label>
                <div className="mt-4 flex flex-wrap">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full md:mr-2 w-full md:w-auto"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-2 md:w-auto"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
