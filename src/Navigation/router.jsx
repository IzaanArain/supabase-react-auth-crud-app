import { createBrowserRouter } from "react-router";
import App from "../App";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";


export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    { path: "/dashboard", element: <PrivateRoutes><Dashboard /></PrivateRoutes> },
])