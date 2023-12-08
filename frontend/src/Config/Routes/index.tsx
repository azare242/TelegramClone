import Login from "../../Pages/Login";
import Register from "../../Pages/Register";
import ResetPassword from "../../Pages/ResetPassword";
import ResetPasswordRequest from "../../Pages/ResetPasswordRequest";
import Home from "../../Pages/Home";
import Massenger from "../../Layouts/Massenger";

export type AppRouteType = {
  path: string;
  name: string;
  element: JSX.Element;
};

export const publicRoutes: AppRouteType[] = [
  {
    path: "",
    name: "Home",
    element: <Home />,
  },
  {
    path: "login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "signup",
    name: "Register",
    element: <Register />,
  },
  {
    path: "requestresetpassword",
    name: "",
    element: <ResetPasswordRequest />,
  },
  {
    path: "resetpassword",
    name: "Reset Password",
    element: <ResetPassword />,
  },
  {
    path: "ppllss",
    name: "success",
    element: <Massenger><h1>Coming soon</h1></Massenger>,
  },
];
