/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../../index.css"
import "../../css/postCard.css"

import { formatDistanceToNow } from "date-fns";

import {  Box, Card, Typography } from "@mui/material"
import { FaHeart } from "react-icons/fa6";
import { FaRetweet } from "react-icons/fa6";
import { FaCommentDots } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { BsBookmarkPlusFill } from "react-icons/bs";

const PostCard = ({post, propClass}) => {
    const [postDate, setPostDate] = useState(post.date)

    useEffect(() => {
        const formattedDate = formatDistanceToNow(new Date(post.date), { addSuffix: true });
        setPostDate(formattedDate);
    }, [post.date]);

    return (
        <Card className={`h-card post-card ${propClass}`}>
            <Box sx={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#ccc'
            }}></Box>

            <Box 
                display={'flex'}
                flexDirection={'column'}
                paddingTop={'.4rem'}
                rowGap={'.8rem'}
                width={'87%'}
            >
                <Box>
                    <Box display={'flex'} gap={'.5rem'} alignItems={'center'}>
                        <Typography typography={'h5'} color="#fff" fontWeight={'400'} fontSize={'1.1rem'}>{post.user.firstname} {post.user.lastname}</Typography>
                        <Typography typography={'p'} color="rgba(255,255,255, .6)">· </Typography>
                        <Typography typography={'p'} color="rgba(255,255,255, .4)" fontWeight={'300'} fontSize={'.9rem'}>@{post.user.username}</Typography>
                    </Box>

                    <Typography typography={'p'} color="rgba(255,255,255, .4)" fontWeight={'300'} fontSize={'.85rem'} marginBottom={'.7rem'}>{postDate}</Typography>
                    <Typography typography={'p'} color="#fff" fontWeight={'400'} fontSize={'1rem'}>{post.text}</Typography>
                    <Box textAlign={'center'}>
                        {
                            post.imageId != null ? 
                                <img className="post-file" key={post.imageId} src={post.fileUrl} alt="post photo"/> 
                            : post.videoId != null ? 
                                <video className="post-file" key={post.videoId} src={post.fileUrl} autoPlay alt="post video"/> 
                            : null
                        }
                    </Box>
                    
                </Box>
                <Box
                    width={'100%'}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'} 
                    marginBottom={'.7rem'}
                >
                    <Box 
                        display={'flex'}
                        columnGap={'.7rem'}
                        alignItems={'center'}
                    >
                        <Box className="post-interaction-icon interaction-fav">
                            <FaHeart color="#fff" size={16}/>
                        </Box>
                        <Box className="post-interaction-icon interaction-repost">
                            <FaRetweet color="#fff" size={19}/>
                        </Box>
                        <Box className="post-interaction-icon interaction-comment">
                            <FaCommentDots color="#fff" size={17}/>
                        </Box>
                        <Typography typography={'p'} color="rgba(255,255,255, .4)" fontWeight={'300'} fontSize={'.88rem'}>567k</Typography>
                    </Box>

                    <Box display={'flex'} columnGap={'.4rem'}>
                        
                        <IoStatsChart color="rgba(255,255,255, .5)" size={17}/>
                        <Typography 
                            className="post-views-count"
                            typography={'p'} 
                            color="rgba(255,255,255, .5)" 
                            fontWeight={'300'} 
                            fontSize={'.87rem'}
                        >
                            2.8M. Views
                        </Typography>
                    </Box>
                </Box>

                <Box 
                    display={'flex'}
                    alignItems={'center'}
                    columnGap={'.8rem'}
                    width={'100%'}
                >
                    <Box className="post-interaction-btn" component={'button'} display={'flex'} alignItems={'center'} gap={'.4rem'} color={'#fff'}>
                        <FaHeart color="#fff" size={20}/>
                        <Typography typography={'p'}>Like</Typography>
                    </Box>
                    <Box className="post-interaction-btn" component={'button'} display={'flex'} alignItems={'center'} gap={'.4rem'} color={'#fff'}>
                        <FaHeart color="#fff" size={20}/>
                        <Typography typography={'p'}>Repost</Typography>
                    </Box>
                    <Box className="post-interaction-btn" component={'button'} display={'flex'} alignItems={'center'} gap={'.4rem'} color={'#fff'}>
                        <FaHeart color="#fff" size={20}/>
                        <Typography typography={'p'}>Comment</Typography>
                    </Box>
                    <Box className="post-interaction-btn post-interaction-save" component={'button'} display={'flex'} alignItems={'center'} gap={'.4rem'} color={'#fff'}>
                        <BsBookmarkPlusFill color="#fff" size={20}/>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}

export default PostCard