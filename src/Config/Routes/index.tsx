import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";
import ResetPassword from "../../Components/ResetPassword/ResetPassword";
import ResetPasswordRequest from "../../Components/ResetPassword/ResetPasswordRequest";
import Home from "../../Pages/Home";

export type AppRouteType = {
  path: string;
  name: string;
  element: JSX.Element;
};

export const routes: AppRouteType[] = [
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
];
