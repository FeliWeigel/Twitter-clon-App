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



const HomePage = () => {
  const [userProfile, setUserprofile] = useState(null);
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const token = sessionStorage.getItem("acc_token");

    if(token){
      UserService.getUserProfile(token)
      .then(res => {
        setUserprofile(res)
      })
      .finally(() => {
        setLoading(false);
      });
    }else {
      setLoading(false)
    }
  },[])

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
           <Box position={"relative"} width={'53%'}>
              <NewPostCard/>
           </Box>
           <Box position={"relative"} width={'25%'}>
              <TrendsCard/>
           </Box>
        </Box>
    </Box>
  )
}

export default HomePage;