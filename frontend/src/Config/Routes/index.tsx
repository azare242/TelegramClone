import Login from "../../Pages/Login";
import Register from "../../Pages/Register";
import Home from "../../Pages/Home";
import Massenger from "../../Layouts/Massenger";
import Settings from "../../Pages/Settings";
import ChatCardList from "../../Components/Chat/ChatList";

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
    path: "ppllss",
    name: "success",
    element: (
      <Massenger>
      <ChatCardList
        chatItems={[
          {
            id: 1,
            username: "JohnDoe",
            avatarSrc: "",
            message: "Hello World!",
          },
          { id: 2, username: "JaneDoe", avatarSrc: "", message: "Hi there!" },
          {
            id: 1,
            username: "JohnDoe",
            avatarSrc: "",
            message: "Hello World!",
          },
          { id: 2, username: "JaneDoe", avatarSrc: "", message: "Hi there!" },
          {
            id: 1,
            username: "JohnDoe",
            avatarSrc: "",
            message: "Hello World!",
          },
          { id: 2, username: "JaneDoe", avatarSrc: "", message: "Hi there!" },
          {
            id: 1,
            username: "JohnDoe",
            avatarSrc: "",
            message: "Hello World!",
          },
          { id: 2, username: "JaneDoe", avatarSrc: "", message: "Hi there!" },
          {
            id: 1,
            username: "JohnDoe",
            avatarSrc: "",
            message: "Hello World!",
          },
          { id: 2, username: "JaneDoe", avatarSrc: "", message: "Hi there!" },
          {
            id: 1,
            username: "JohnDoe",
            avatarSrc: "",
            message: "Hello World!",
          },
          { id: 2, username: "JaneDoe", avatarSrc: "", message: "Hi there!" },
          {
            id: 1,
            username: "JohnDoe",
            avatarSrc: "",
            message: "Hello World!",
          },
          { id: 2, username: "JaneDoe", avatarSrc: "", message: "Hi there!" },
          {
            id: 1,
            username: "JohnDoe",
            avatarSrc: "",
            message: "Hello World!",
          },
          { id: 2, username: "JaneDoe", avatarSrc: "", message: "Hi there!" },
          {
            id: 1,
            username: "JohnDoe",
            avatarSrc: "",
            message: "Hello World!",
          },
          { id: 2, username: "JaneDoe", avatarSrc: "", message: "Hi there!" },
          {
            id: 1,
            username: "JohnDoe",
            avatarSrc: "",
            message: "Hello World!",
          },
          { id: 2, username: "JaneDoe", avatarSrc: "", message: "Hi there!" },
        ]}
      />
      </Massenger>
    ),
  },
  {
    path: "settings",
    name: "Settings",
    element: <Settings />,
  },
];
