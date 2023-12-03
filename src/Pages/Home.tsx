import { Alert, Snackbar } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {Button} from '@mui/material'
import TEL from '../assets/icons8-telegram-96.png'
const Home = () => {
  const [searchParams] = useSearchParams();

  const login_error: boolean =
    searchParams.get("login_error") === "1" ? true : false;
  return (
    <div className="flex flex-col items-center justify-center h-[30rem] w-[45rem] mt-[5rem] border-2  bg-slate-700 rounded-2xl border-blue-500 gap-10">
      <div className="w-[15rem] flex flex-col items-center justify-center text-center gap-4">
          <img src={TEL} alt='app'/>  
          <p>
            welcome to mytel
            <br/>
            by<br/> alireza zare <br/>&<br/> sadegh mohammadi
            </p>
      </div>
      <div className="w-[75%] flex items-center justify-center gap-5"> 
        <Link to="/login">
          <Button variant="contained"> Login </Button>
        </Link>
        <Link to="/signup">
          <Button variant="contained"> Signup </Button>
        </Link>
      </div>

      <Snackbar
        open={login_error}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={`error`} sx={{ width: "100%" }}>
          Please Login
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
