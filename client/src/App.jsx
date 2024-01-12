import { createBrowserRouter , RouterProvider } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
import AdminAllUsers from "./components/AdminAllUsers"
import Info from "./page/Info"
import PageNotFound from "./page/PageNotFound"
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
