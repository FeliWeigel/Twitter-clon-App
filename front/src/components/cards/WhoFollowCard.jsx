/* eslint-disable react/prop-types */
import "../../index.css"
import "../../css/whoFollowCard.css"
import { Box, Card, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import FollowBtn from "../btn/FollowBtn"

const WhoFollowCard = ({propClass}) => {
  return (
    <Card className={`whofollow-card ${propClass}`}>
        <Typography typography={'p'} fontSize={'.95rem'} padding={'.4rem 1.1rem .1rem 1.1rem'} color="#fff" letterSpacing={'.02rem'}>
            Who is to follow you
        </Typography>
        <Box display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} padding={'.5rem 1.1rem'} 
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
                <Box display={'flex'} flexDirection={'column'}>
                <Typography typography={'p'} color="#fff" fontSize={'.88rem'} lineHeight={'.6rem'}>Jhon Doe</Typography>
                <Typography typography={'p'} color="rgba(255,255,255, .4)" fontSize={'.75rem'} fontWeight={'300'}>@jhond1987</Typography>
                </Box>
            </Box>
            
            <FollowBtn/>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} padding={'.5rem 1.1rem'} 
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
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography typography={'p'} color="#fff" fontSize={'.88rem'} lineHeight={'.6rem'}>Jhon Doe</Typography>
                        <Typography typography={'p'} color="rgba(255,255,255, .4)" fontSize={'.75rem'} fontWeight={'300'}>@jhond1987</Typography>
                    </Box>
                </Box>
                
                <FollowBtn/>
            </Box>
        </Box>
        <Box fontSize={'.8rem'}>
            <Link className="h-recomend-link" to="/recomendations/users">
            Show more
            </Link>
        </Box>
    </Card>
  )
}

export default WhoFollowCard