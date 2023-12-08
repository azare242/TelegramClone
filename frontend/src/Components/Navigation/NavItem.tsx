import { Button } from "@mui/material";
import { Link } from "react-router-dom";
interface PropsInfo {
  path: string;
  name: string;
  icon: JSX.Element | null;
}
const NavItem = ({ path, name, icon }: PropsInfo) => {
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
