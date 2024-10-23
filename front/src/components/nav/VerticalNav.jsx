import { Box } from "@mui/material"
import "../../index.css"
import { BiHomeCircle } from "react-icons/bi";
import { FaHashtag } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineBookmarks } from "react-icons/md";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";
import NewPostBtn from "../btn/NewPostBtn";

const VerticalNav = () => {
  const handleLogout = () => {
    UserService.logout();
  }
  return (
    <Box className="vertical-nav" component={'nav'}>
        <Box height={'80%'} display={'flex'} flexDirection={'column'} rowGap={'2rem'}>
            <Link to="/home">
              <Box className="vertical-nav-link" component={'button'}>
                <BiHomeCircle size={22}/>Home
              </Box>
            </Link>
            <Link to="/explore">
              <Box className="vertical-nav-link" component={'button'}>
                <FaHashtag size={22}/>Explore
              </Box>
            </Link>
            <Link to="/notifications">
              <Box className="vertical-nav-link" component={'button'}>
                <IoNotificationsOutline size={22}/>Notifications
              </Box>
            </Link>
            <Link to="/messages">
              <Box className="vertical-nav-link" component={'button'}>
                <MdOutlineEmail size={22}/>Messages
              </Box>
            </Link>
            <Link to="/bookmarks">
              <Box className="vertical-nav-link" component={'button'}>
                <MdOutlineBookmarks size={22}/>Bookmarks
              </Box>
            </Link>
            <NewPostBtn prop={"np-btn-vnav"}/>
            <Box className="vertical-nav-link"
              onClick={handleLogout}
              component={'button'} 
              justifyContent={'center'} 
              marginTop={'.7rem'}
            >
              Log Out <FaArrowRightFromBracket size={22}/>
            </Box>
        </Box>
    </Box>
  )
}

export default VerticalNav