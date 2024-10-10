/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import "../../index.css"
import "../../css/trendsCard.css"
import { Box, Card, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { FiTrendingUp } from "react-icons/fi";

const TrendsCard = ({propClass}) => {
  return (
    <Card className={`h-card trends-card ${propClass}`}>
        <Box display={'flex'}  gap={'.4rem'} alignItems={'center'} width={'100%'}>
        <Typography typography={'p'} fontSize={'1rem'} color="#fff" letterSpacing={'.02rem'}>
            Trends for you
        </Typography>

        <FiTrendingUp size={17} color="#fff"/>
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
            <Box 
                padding={'.8rem 0'}
                borderBottom={'1px solid rgba(255,255,255, .2)'}
            >
            <Typography typography={'p'} color="rgba(255,255,255, .5)" fontWeight={300} marginBottom={'.5rem'}>
                Football · Trending
            </Typography>
            <Box display={'flex'} flexDirection={'column'} rowGap={'.5rem'}>
                <Box className="trend" display={'block'}>
                <Typography typography={'p'} className="trend-name">
                    Mbappe
                </Typography>
                <Typography typography={'p'} className="trend-stats">
                    107.4k posts
                </Typography>
                </Box>
                <Box className="trend" display={'block'}>
                <Typography typography={'p'} className="trend-name">
                    Real Madrid
                </Typography>
                <Typography typography={'p'} className="trend-stats">
                    89.5k posts
                </Typography>
                </Box>
                <Box className="trend" display={'block'}>
                <Typography typography={'p'} className="trend-name">
                    Ballon D'Or
                </Typography>
                <Typography typography={'p'} className="trend-stats">
                    287k posts
                </Typography>
                </Box>
                <Box className="trend" display={'block'}>
                <Typography typography={'p'} className="trend-name">
                    Vinicius Jr.
                </Typography>
                <Typography typography={'p'} className="trend-stats">
                    54.3k posts
                </Typography>
                </Box>
            </Box>
            </Box>

            <Box 
            padding={'.8rem 0'}
            borderBottom={'1px solid rgba(255,255,255, .2)'}
            >
            <Typography typography={'p'} color="rgba(255,255,255, .5)" fontWeight={300} marginBottom={'.5rem'}>
                Global · Trending
            </Typography>
            <Box display={'flex'} flexDirection={'column'} rowGap={'.5rem'}>
                <Box className="trend" display={'block'}>
                <Typography typography={'p'} className="trend-name">
                    Trump
                </Typography>
                <Typography typography={'p'} className="trend-stats">
                    95.8k posts
                </Typography>
                </Box>
                <Box className="trend" display={'block'}>
                <Typography typography={'p'} className="trend-name">
                    Tesla
                </Typography>
                <Typography typography={'p'} className="trend-stats">
                    46.7k posts
                </Typography>
                </Box>
            </Box>
            </Box>
        </Box>
        
        <Box fontSize={'.8rem'}>
        <Link className="h-trends-link" to="/trends">
            Show more
        </Link>
        </Box>
    </Card>
  )
}

export default TrendsCard