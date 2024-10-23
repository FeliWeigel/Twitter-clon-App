/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material"
import "../../index.css"
import FollowBtn from "../btn/FollowBtn"

const UserCard = ({user}) => {
    return (
        <Box key={user.username} display={'flex'} alignItems={'center'} justifyContent={'space-between'} padding={'.5rem 1rem'} 
            sx={{
                cursor: 'pointer',
                transition: '.4s ',
                ":hover": {
                    background: '#21313d !important'
                }
            }} 
        >
                <Box display={'flex'} alignItems={'center'} columnGap={'1rem'}>
                    <Box sx={{ 
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        backgroundColor: '#ccc'
                    }}></Box>
                    <Box display={'flex'} flexDirection={'column'} rowGap={'.3rem'}>
                        <Typography typography={'p'} color="#fff" fontSize={'.88rem'} lineHeight={'.6rem'}>{user.firstname} {user.lastname}</Typography>
                        <Typography typography={'p'} color="rgba(255,255,255, .4)" fontSize={'.75rem'} fontWeight={'300'}>@{user.username}</Typography>
                    </Box>
                </Box>
                
                <FollowBtn/>
        </Box>
    )
}

export default UserCard