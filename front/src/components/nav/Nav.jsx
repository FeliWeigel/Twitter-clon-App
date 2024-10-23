import { Box } from "@mui/material";
import "../../index.css"
import { FaTwitter } from "react-icons/fa";

const Nav = () => {
  return (
    <Box component={'nav'} className="nav">
        <Box display={'flex'} columnGap={'1rem'} alignItems={'center'}>
            <a href="/home">
                <FaTwitter size={24} color="#1a90d9"/>
            </a>
            <Box component={'input'} type="text" placeholder="# Explore" sx={{
                padding: '7px 15px',
                color: 'rgba(255,255,255, .8)',
                fontSize: '.85rem',
                backgroundColor: '#1d2b35',
                borderRadius: '30px'
            }}/>
        </Box>

    </Box>
  )
}

export default Nav