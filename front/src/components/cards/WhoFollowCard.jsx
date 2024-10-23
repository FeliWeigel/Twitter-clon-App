/* eslint-disable react/prop-types */
import "../../index.css"
import "../../css/whoFollowCard.css"
import { Box, Card, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import UserCard from "./UserCard"

const WhoFollowCard = ({propClass}) => {
    const user = {
        firstname: 'Frank',
        lastname: 'Ribbery',
        username: 'ribbery17',
    }

    return (
        <Card className={`whofollow-card ${propClass}`}>
            <Typography typography={'p'} fontSize={'.95rem'} padding={'.4rem 1.1rem .1rem 1.1rem'} color="#fff" letterSpacing={'.02rem'}>
                Who is to follow you
            </Typography>
            <Box display={'flex'} flexDirection={'column'}> 
                <UserCard user={user}/>
                <UserCard user={user}/>
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