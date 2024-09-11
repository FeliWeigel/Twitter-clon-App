/* eslint-disable react/prop-types */
import "../../index.css"
import "../../css/home.css"
import { Box, Card } from "@mui/material"
import { TbPhotoFilled } from "react-icons/tb";
import { FaVideo } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";

const NewPostCard = () => {
  return (
    <Card className="h-card h-card-new-post">
        <Box display={'flex'} gap={'1rem'} alignItems={'center'}>
        <Box sx={{
            width: '42px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#ccc'
            }}></Box>
        <Box component={'input'} type="text" placeholder="What's happening?!"  maxLength={250} color={'#fff'} 
            sx={{
            background: '#2a3a45',
            padding: '.8rem 1rem',
            width: '100%',
            borderRadius: '7px',
            "::placeholder": {
                color: 'rgba(255,255,255, .7)'
            }
            }}>
        </Box>
        </Box>
        <Box display={'flex'} gap={'1rem'} alignItems={'center'} marginTop={'1rem'}>
        <Box 
            component={'button'} 
            className="post-option-add"
        >
            <TbPhotoFilled className="post-photo-icon" size={20} color="rgb(0, 193, 0)" /> Photo
        </Box>
        <Box 
            component={'button'} 
            className="post-option-add"
        >
            <FaVideo className="post-photo-icon" size={20} color="rgb(25, 25, 255)" /> Video
        </Box>
        <Box 
            component={'button'} 
            className="post-option-add"
        >
            <IoCalendar className="post-photo-icon" size={20} color="rgb(252, 164, 0)" /> Schedule
        </Box>
        </Box>
    </Card>
  )
}

export default NewPostCard