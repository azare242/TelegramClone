import { Alert, Snackbar } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
const Home = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login_error: boolean = searchParams.get("login_error") === '1' ? true : false;
  return (
    <div>
      <Snackbar open={login_error} autoHideDuration={6000} onClose={() => navigate('/login')}
      anchorOrigin={{vertical: "top", horizontal: "center"}}
      >
        <Alert onClose={() => navigate('/login')} severity={`error`} sx={{ width: "100%" }}>
          Please Login
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
