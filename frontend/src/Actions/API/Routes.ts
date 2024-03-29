
interface ApiRoute {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
}

interface ApiRoutes {
  //USER ROUTES
  register: ApiRoute;
  login: ApiRoute;
  logout: ApiRoute;
  getUser: ApiRoute;
  updateUser: ApiRoute;
  deleteUser: ApiRoute;
  findUser: ApiRoute;
  getPfp: ApiRoute;

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
  getGroup: ApiRoute;
  getGroups: ApiRoute

}
export const BASE_URL_HTTP = "http://127.0.0.1:3000/api"
export const BASE_URL_WS = "ws://66.248.207.109/api"
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
  logout: {
    method: "POST",
    path: "/users/signout"
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
  getPfp: {
    method: "GET",
    path: "/users/pfp/$1"
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
    method: "POST",
    path: "/groups/$1",
  },
  kickMember: {
    method: "DELETE",
    path: "/groups/$1/$2",
  },
  getGroup: {
    method: "GET",
    path: "/groups/$1"
  },
  getGroups: {
     method : "GET",
     path: "/groups/allgroups"
  }
};
