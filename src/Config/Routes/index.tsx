import Login from "../../Components/Login/Login"
import Register from "../../Components/Register/Register"
import ResetPassword from "../../Components/ResetPassword/ResetPassword"

export type AppRouteType = {
    path: string,
    name: string,
    element: JSX.Element
}

export const routes: AppRouteType[] = [
    {
        path: "",
        name: "Home",
        element: <h1>home</h1>
    },
    {
        path: "login",
        name: "Login",
        element: <Login/>
    },
    {
        path: "signup",
        name: "Register",
        element: <Register/>
    },
    {
        path: "resetpassword",
        name: "",
        element: <ResetPassword/>
    }
]

