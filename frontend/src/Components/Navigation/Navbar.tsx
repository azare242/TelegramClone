import { AppBar, ButtonGroup, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import NavItem from "./NavItem";
import { Link, useNavigate } from "react-router-dom";
import TEL from "../../assets/icons8-telegram-96.png";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import AppsTwoToneIcon from "@mui/icons-material/AppsTwoTone";
import { useAPI } from "../../Actions/API/useAPI";
import { useLanguage } from "../../Config/Languages/useLanguage";
import React from "react";
import { LanguageConfig } from "../../Config/Languages/LanguageProvider";
import TranslateIcon from '@mui/icons-material/Translate';
import { Book } from "@mui/icons-material";
const Navbar = () => {
  const { jsonWebToken } = useAPI();
  const { language, FA, EN , setLanguage } = useLanguage();
  const languageConfig = React.useMemo<LanguageConfig>((): LanguageConfig => {
    if (language === "FA") return FA as LanguageConfig;
    else return EN as LanguageConfig;
  }, [EN, FA, language]);

  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElLANG, setAnchorElLANG] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMenuOpenLANG = Boolean(anchorElLANG);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
     const handleProfileMenuOpenLANG = (event) => {
    setAnchorElLANG(event.currentTarget);
  };

  const handleMenuCloseLANGFA = () => {
    setLanguage && setLanguage("FA")
    setAnchorElLANG(null);
  }; 
  const handleMenuCloseLANGEN = () => {
    setLanguage && setLanguage("EN")
    setAnchorElLANG(null);
  }; 

  const handleMenuCloseLANG = () => {
    setAnchorElLANG(null);
  }; 



  return (
    <>
      <AppBar color={`primary`}>
        <Toolbar sx={{ gap: "0.5rem" }}>
          <Link to="">
            <img
              src={TEL}
              alt="app-logo"
              className="rounded h-[3rem] mr-auto hover:shadow-lg hover:shadow-slate-700 hover:bg-slate-100"
            />
          </Link>
          {jsonWebToken && (
            <ButtonGroup>
              <NavItem
                path="/ppllss?c=pv"
                name={languageConfig.navbar.privates}
                icon={<PersonOutlineTwoToneIcon />}
              />
              <NavItem
                path="/ppllss?c=g"
                name={languageConfig.navbar.groups}
                icon={<GroupsTwoToneIcon />}
              />
              <NavItem
                path="/contacts"
                name={languageConfig.contacts}
                icon={<Book />}
              />
            </ButtonGroup>
          )}
                    {
            <><IconButton

            onClick={handleProfileMenuOpenLANG}
          >
            <TranslateIcon />
          </IconButton><Menu
            anchorEl={anchorElLANG}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMenuOpenLANG}
            onClose={handleMenuCloseLANG}
          >
              <MenuItem onClick={handleMenuCloseLANGFA}>FA</MenuItem>
              <MenuItem onClick={handleMenuCloseLANGEN}>EN</MenuItem>
            </Menu></>
          }
          {
            jsonWebToken && (
              <><IconButton
                sx={language === "FA"
                  ? { marginRight: "auto" }
                  : { marginLeft: "auto" }}
                onClick={handleProfileMenuOpen}
              >
                <AccountCircleTwoToneIcon />
              </IconButton><Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                  <MenuItem onClick={() => {
                    navigate("/settings")
                    handleMenuClose()

                  }}>{languageConfig.settings}</MenuItem>
                  <MenuItem onClick={()=>{handleMenuClose()}}>{languageConfig.logout}</MenuItem>
                </Menu></>
            )
          }


        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
