import { createBrowserRouter , RouterProvider } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
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
    }
  ])

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
