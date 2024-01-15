import { createBrowserRouter , RouterProvider } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
import AdminAllUsers from "./components/AdminAllUsers"
import Info from "./page/Info"
import PageNotFound from "./page/PageNotFound"
import AdminPost from "./components/AdminPost"
import AdminPosts from "./components/AdminPosts.jsx"
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path : "/register",
      element : <Register />
    },
    {
      path : "/profile",
      element : <Profile /> 
    },
    {
      path : "/getAllusers",
      element : <AdminAllUsers />
    },
    {
      path : "/info",
      element : <Info />
    },
    {
      path : "/adminpost",
      element : <AdminPost />
    },
    {
      path : "/admin/:userId/posts",
      element : <AdminPosts />
    },
    {
      path : "*",
      element : <PageNotFound />
    }
  ])

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
