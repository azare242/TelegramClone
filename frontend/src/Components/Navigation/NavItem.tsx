import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
interface PropsInfo {
    path: string,
    name: string
}
const NavItem = ({path, name}: PropsInfo) => {
  return (
    <>
    <Link to={path}>
        <Button variant={`contained`} color={`secondary`}>
            {name}
        </Button>
    </Link>
    </>
  )
}

export default NavItem