/* eslint-disable react/prop-types */
import "../../index.css"
import PostCard from "../cards/PostCard"

import { Box } from "@mui/material"

const Feed = ({postList}) => {
    return (
        <Box display={'flex'} flexDirection={'column'} rowGap={'1.5rem'}>
            {postList.map((post) => {
                return (
                 <PostCard key={post.id} post={post}/>
                )
              })}
        </Box>
    )
} 

export default Feed;