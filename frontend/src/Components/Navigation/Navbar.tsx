import { AppBar, ButtonGroup, IconButton, Toolbar } from "@mui/material";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import TEL from "../../assets/icons8-telegram-96.png";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import AppsTwoToneIcon from "@mui/icons-material/AppsTwoTone";
import { useAPI } from "../../Actions/API/useAPI";
import { useLanguage } from "../../Config/Languages/useLanguage";
import React from "react";
import { LanguageConfig } from "../../Config/Languages/LanguageProvider";
const Navbar = () => {
  const { jsonWebToken } = useAPI();
  const { language, FA, EN } = useLanguage();
  const languageConfig = React.useMemo<LanguageConfig>((): LanguageConfig => {
    if (language === "FA") return FA as LanguageConfig;
    else return EN as LanguageConfig;
  }, [EN, FA, language]);
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
                path="/a/"
                name={languageConfig.navbar.all}
                icon={<AppsTwoToneIcon />}
              />
              <NavItem
                path="/b/c"
                name={languageConfig.navbar.privates}
                icon={<PersonOutlineTwoToneIcon />}
              />
              <NavItem
                path="/d/c"
                name={languageConfig.navbar.groups}
                icon={<GroupsTwoToneIcon />}
              />
            </ButtonGroup>
          )}
          <IconButton
            sx={
              language === "FA"
                ? { marginRight: "auto" }
                : { marginLeft: "auto" }
            }
            onMouseEnter={() => console.log("focus in")}
            onMouseLeave={() => console.log("focus out")}
          >
            <AccountCircleTwoToneIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
