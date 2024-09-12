/* eslint-disable react/prop-types */
import "../../index.css"
import "../../css/home.css"
import { Box, Card, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const ProfileCard = ({user}) => {
  return (
    <Card className="h-profile-card">
        <Box 
        sx={{
            background: '#000',
            width: '100%',
            height: '4.2rem',
            position:'relative',
            display: 'flex',
            justifyContent: 'center'
        }}
        >
        <Box sx={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#ccc',
            marginTop: '2.2rem'
        }}></Box>
        </Box>

        <Box 
            padding={'1.7rem 0 .8rem 0'} 
            display={'flex'} 
            flexDirection={'column'} 
            alignItems={'center'}
        >
        <Typography typography={'p'} textAlign={'center'} color="#fff" fontSize={'1.07rem'}>{user.firstname}</Typography>
        <Typography 
            typography={'p'} 
            fontSize={'.85rem'} 
            textAlign={'center'} 
            color="rgba(255,255,255, .4)"
            fontWeight={'300'}
            marginBottom={'.3rem'}
        >
            @{user.username}
        </Typography>
        <Typography 
            typography={'p'} 
            fontSize={'.8rem'} 
            textAlign={'center'} 
            color="rgba(255,255,255, .75)"
            width={'80%'}
            fontWeight={'400'}
            lineHeight={'1rem'}
        >
            {user.description}
        </Typography>
        </Box>

        <Box sx={{
            height: '4.1rem',
            width: '100%',
            padding: '0 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255, .1)',
            borderBottom: '1px solid rgba(255,255,255, .1)',
            columnGap: '1.2rem'
        }}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Typography typography={'p'} color="#fff" fontSize={'1rem'}>
                1.923
            </Typography>
            <Typography typography={'p'} color="rgba(255,255,255, .55)" fontSize={'.8rem'} fontWeight={'300'}>
                Following
            </Typography>
            </Box>

            <Box height={'2.7rem'} width={'1px'} sx={{background: 'rgba(255,255,255, .2)'}}></Box>
            
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Typography typography={'p'} color="#fff" fontSize={'1rem'}>
                7.486
            </Typography>
            <Typography typography={'p'} color="rgba(255,255,255, .55)" fontSize={'.8rem'} fontWeight={'300'}>
                Followers
            </Typography>
            </Box>
        </Box>

        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} padding={'1.1rem'} >
        <Link className="h-profile-link" to="/profile">My profile</Link>
        </Box>
    </Card>
  )
}

export default ProfileCard