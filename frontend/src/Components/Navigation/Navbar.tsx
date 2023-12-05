import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import TEL from "../../assets/icons8-telegram-96.png";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import AppsTwoToneIcon from '@mui/icons-material/AppsTwoTone';
import { useAPI } from "../../Actions/API/useAPI";
const Navbar = () => {
  const { jsonWebToken } = useAPI();
  return (
    <>
      <AppBar color={`primary`}>
        <Toolbar sx={{ gap: "0.5rem" }}>
          <Link to="">
            <img src={TEL} alt="app-logo" className="rounded h-[3rem] mr-auto hover:shadow-lg hover:shadow-slate-700 hover:bg-slate-100"/>
          </Link>
          {jsonWebToken && (
            <>
              <NavItem path="/a/" name="All" icon={<AppsTwoToneIcon/>}/>
              <NavItem path="/b/c" name="Privates" icon={<PersonOutlineTwoToneIcon/>} />
              <NavItem path="/d/c" name="Groups" icon={<GroupsTwoToneIcon/> }/>
              <IconButton sx={{ marginLeft: "auto" }} onMouseEnter={() => console.log("focus in")} onMouseLeave={() => console.log("focus out")}>
                <AccountCircleTwoToneIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
