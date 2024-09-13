import { useEffect, useState } from "react"

import "../../index.css"
import "../../css/home.css"
import { Box, Typography } from "@mui/material"

import UserService from "../../services/UserService.js"
import ProfileCard from "./ProfileCard.jsx"
import WhoFollowCard from "./WhoFollowCard.jsx"
import NewPostCard from "./NewPostCard.jsx"
import TrendsCard from "./TrendsCard.jsx"
import Nav from "../nav/Nav"
import PostCard from "./PostCard.jsx"
import PostService from "../../services/PostService.js"



const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true)
  const [feed, setFeed] = useState([]);
  const fetchInterval = 20000; 

  const fetchData = async () => {
    const token = sessionStorage.getItem("acc_token");
    if(token){
        const [newFeed, userProfile] = await Promise.all([
            PostService.getFeed(token)
          ,
            UserService.getUserProfile(token)
        ])

        setFeed(prevFeed => (JSON.stringify(prevFeed) !== JSON.stringify(newFeed) ? newFeed : prevFeed));
        setUserProfile(userProfile);
    }else {
      setLoading(false)
    }
  }

  useEffect( () => {
    const token = sessionStorage.getItem("acc_token");

    if(token){
      fetchData().finally(() => setLoading(false));

      const interval = setInterval(fetchData, fetchInterval);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Box className="container h-container" sx={{
      backgroundColor: '#05131C'
    }}> 
        <Nav/>
        <Box className="home">
           <Box position={"relative"} width={'25%'}>
              {loading ? 
                <Typography typography={'p'} textAlign={'center'} color="#fff" marginTop={'7rem'} marginLeft={'2rem'} fontSize={'1.07rem'}>
                  Loading...
                </Typography>
              : 
                
                <ProfileCard user={userProfile}/>
              }
              <WhoFollowCard/>
           </Box>
           <Box 
              position={"relative"} 
              display={'flex'} 
              flexDirection={'column'}
              rowGap={'1.5rem'}
              width={'53%'}
            >
              <NewPostCard/>
              {feed.map(post => {
                return (
                 <PostCard key={post.id} post={post}/>
                )
              })}
              
           </Box>
           <Box position={"relative"} width={'25%'}>
              <TrendsCard/>
           </Box>
        </Box>
    </Box>
  )
}

export default HomePage;