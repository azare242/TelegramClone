
interface ApiRoute {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
}

interface ApiRoutes {
  //USER ROUTES
  register: ApiRoute;
  login: ApiRoute;
  getUser: ApiRoute;
  updateUser: ApiRoute;
  deleteUser: ApiRoute;
  findUser: ApiRoute;

  //CONTACTS ROUTES
  getContats: ApiRoute;
  addContact: ApiRoute;
  deleteContact: ApiRoute;

  //CHAT ROUTES
  createChat: ApiRoute;
  getChats: ApiRoute;
  getChat: ApiRoute;
  deleteChat: ApiRoute;
  deleteMessage: ApiRoute;

  //GROUP CHAT ROUTES
  createGroup: ApiRoute;
  deleteGroup: ApiRoute;
  addMember: ApiRoute;
  kickMember: ApiRoute;
}
export const BASE_URL_HTTP = "http://127.0.0.1/api"
export const BASE_URL_WS = "ws://127.0.0.1/api"
export const API_ROUTES: ApiRoutes = {
  //USER ROUTES
  register: {
    method: "POST",
    path: "/register",
  },
  login: {
    method: "POST",
    path: "/login",
  },
  getUser: {
    method: "GET",
    path: "/users/$1",
  },
  updateUser: {
    method: "PATCH",
    path: "/users/$1",
  },
  deleteUser: {
    method: "DELETE",
    path: "/users/$1",
  },
  findUser: {
    method: "GET",
    path: `/users?keyword="$1"`,
  },

  //CONTACTS ROUTES
  getContats: {
    method: "GET",
    path: "/users/$1/contacts",
  },
  addContact: {
    method: "POST",
    path: "/users/$1/contacts",
  },
  deleteContact: {
    method: "DELETE",
    path: "/users/$1/contacts/$2",
  },

  //CHAT ROUTES
  createChat: {
    method: "POST",
    path: "/chats",
  },
  getChats: {
    method: "GET",
    path: "/chats",
  },
  getChat: {
    method: "GET",
    path: "/chats/$1",
  },
  deleteChat: {
    method: "DELETE",
    path: "/chats/$1",
  },
  deleteMessage: {
    method: "DELETE",
    path: "/chats/$1/messages/$2",
  },

  //GROUP ROUTES
  createGroup: {
    method: "POST",
    path: "/groups",
  },
  deleteGroup: {
    method: "DELETE",
    path: "/groups/$1",
  },
  addMember: {
    method: "PATCH",
    path: "/groups/$1",
  },
  kickMember: {
    method: "DELETE",
    path: "/groups/$1/$2",
  },
};
