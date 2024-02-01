import Login from "../../Pages/Login";
import Register from "../../Pages/Register";
import Home from "../../Pages/Home";
import Massenger from "../../Pages/Massenger";
import Settings from "../../Pages/Settings";
import Contacts from "../../Pages/Contacts";
import UserInfo from "../../Components/Info/UserInfo";
import GroupInfo from "../../Components/Info/GroupInfo";

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
    path: "ppllss/:chattype/:id",
    name: "success",
    element: (
      <Massenger openedChat={true}/>
    ),
  },
  {
    path: "ppllss/:chattype",
    name: "success",
    element: (
      <Massenger openedChat={false}/>
    ),
  },
  {
    path: "settings",
    name: "Settings",
    element: <Settings />,
  },
  {
    path: "contacts",
    name: "Contacts",
    element: <Contacts/>
  }
  ,
  {
    path: "user/:id",
    name: "userinfo",
    element: <UserInfo/>
  },
  {
    path: "group/:id",
    name: "groupinfo",
    element: <GroupInfo/>
  }
];
