import { Alert, Snackbar } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
const Home = () => {
  const [searchParams] = useSearchParams();

  const login_error: boolean =
    searchParams.get("login_error") === "1" ? true : false;
  return (

     <div 
     className={`flex flex-row items-start justify-between m-60 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700`}
     >



      <h1>Welcome</h1>
      <Snackbar
        open={login_error}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          
          severity={`error`}
          sx={{ width: "100%" }}
        >
          Please Login
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
