import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NavItem: React.FC<{
  path: string;
  name: string;
  icon: JSX.Element | null;
}> = ({ path, name, icon }) => {
  return (
    <>
      <Link to={path}>
        <Button
          variant={`contained`}
          color={`secondary`}
          startIcon={icon ? (icon as JSX.Element) : <></>}
        >
          {name}
        </Button>
      </Link>
    </>
  );
};

export default NavItem;
