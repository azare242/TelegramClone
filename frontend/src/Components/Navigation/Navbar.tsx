import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"
import NavItem from "./NavItem"
import { Link } from "react-router-dom"
import TEL from '../../assets/icons8-telegram-96.png'
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
const Navbar = () => {
  return (
    <>
        <AppBar color={`primary`}>
            <Toolbar
            sx={{gap: "0.5rem"}}>
                <Link to="">
                    <img src={TEL} alt="app-logo" className="w-[35%]"/>
                </Link>
                <NavItem path="/a/" name="All"/>
                <NavItem path="/b/c" name="Privates"/>
                <NavItem path="/d/c" name="Groups"/>
                <IconButton sx={{marginLeft: "auto"}}>
                  <AccountCircleTwoToneIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar