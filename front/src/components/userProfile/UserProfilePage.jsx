/* eslint-disable react-hooks/exhaustive-deps */

import "../../index.css"
import "../../css/userProfile.css"
import { useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import Nav from "../nav/Nav"
import TrendsCard from "../cards/TrendsCard"
import portada from "../../assets/imgs/registerWall.png"
import UserService from "../../services/UserService"
import Loading from "../../utils/Loading"
import PostService from "../../services/PostService"
import FollowsList from "./FollowsList"

import { Box, Typography } from "@mui/material"
import { FaArrowLeft } from "react-icons/fa6";
import VerticalNav from "../nav/VerticalNav"
import EditProfilePopUp from "./EditProfilePopUp"
import Feed from "../feed/Feed"
import IsFollowerCard from "../cards/IsFollowerCard"
import FollowUnfollowBtn from "../btn/FollowUnfollowBtn"

const UserProfilePage = () => {
   const [editMode, setEditMode] = useState(false)

   const [authUser, setAuthUser] = useState(null)
   const { username: userUsername } = useParams()
   const [isFollower, setIsFollower] = useState(false)
   const [userDetails, setUserDetails] = useState(null)
   const [userFeed, setUserFeed] = useState([])
   const [numberOfFollowers, setNumberOfFollowers] = useState(0)
   const [numberOfFollowing, setNumberOfFollowing] = useState(0)

   const [activeSection, setActiveSection] = useState('Posts')
   const sections = ['Posts', 'Posts and Replies', 'Multimedia', 'Likes']
   const [loading, setLoading] = useState(true);
   
   const [showFollowers, setShowFollowers] = useState(false)
   const [showFollowing, setShowFollowing] = useState(false)
   const scrollTargetRef = useRef(null); 
   const [page, setPage] = useState(0);

   const fetchNewPage = useCallback(async () => {
      const token = sessionStorage.getItem("acc_token");
      if(userDetails && token){
         const res = await PostService.postsByUser(token, userDetails.username, page);
         const newFeed = res._embedded.postDTOes || [];
     
         setUserFeed(prevFeed => [...prevFeed, ...newFeed]); 
         setPage(prevPage => prevPage + 1); 
         setLoading(false);
      }
   }, [page, userDetails]);

   const fetchUserDetails = async (token) => {
      try {
         const res = await UserService.getAllUserDetails(token, userUsername);
         if (res) {
            setUserDetails(res.profile);
            setAuthUser(res.authUser);
            setNumberOfFollowers(res.followers);
            setNumberOfFollowing(res.following);
            const isFollower = await UserService.isFollower(token, userUsername);
            if(isFollower != null){
               setIsFollower(isFollower);
            }

         }
      } catch (error) {
         console.error("Error fetching user details:", error);
      } finally {
         setLoading(false);
      }
   }
   
   useEffect(() => {
      const token = sessionStorage.getItem("acc_token")
      if(token){
         fetchUserDetails(token);
      }else {
         setLoading(true);
      }
   },[])

   useEffect(() => {
      if(userDetails){
         fetchNewPage()
      }
   }, [])

   useEffect( () => {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !loading) {
          fetchNewPage();
        }
      }, { threshold: 0.8 });
      
      const target = scrollTargetRef.current;
      
      if (target) observer.observe(target);
      return () => {
        if (target) observer.unobserve(target);
      };
   }, [loading, fetchNewPage]);

   return (
      <Box className="container p-container" 
         sx={{
            backgroundColor: '#05131C'
      }}> 
         {loading ? 
            <Box width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
               <Loading size={35}/>
            </Box>
             :
            <Box>
               <Nav/>
               {
                  showFollowing || showFollowers || editMode ? 
                  <Box
                     width={'100%'}
                     height={'100vh'}
                     position={'fixed'}
                     display={'flex'}
                     justifyContent={'center'}
                     alignItems={'center'}
                     zIndex={'10000'}
                     top={0}
                     right={0}
                     sx={{backgroundColor: 'rgba(0,0,0, .4)'}}
                  >
                     <Box 
                        component={'button'}
                        position={'absolute'}
                        top={'2rem'}
                        left={'5rem'}
                        onClick={() => {
                           setShowFollowers(false)
                           setShowFollowing(false)
                           setEditMode(false)
                        }}
                     >
                        <FaArrowLeft size={25} color="#fff"/>
                     </Box>
                     {
                        showFollowing && !editMode ? 
                           <FollowsList type={"Following"} username={userUsername}/> 
                        : showFollowers &&  !editMode ?
                           <FollowsList type={"Followers"} username={userUsername}/> 
                        : editMode && !showFollowers && !showFollowing ?
                           <EditProfilePopUp userDetails={userDetails}/>
                        : null
                     }
                  </Box>
                  : null
               }
               <Box className="profile">
                  <Box width={'25%'}>
                     <VerticalNav/>
                  </Box>
                  <Box 
                     position={"relative"} 
                     display={'flex'} 
                     flexDirection={'column'}
                     rowGap={'1.5rem'}
                     width={'50%'}
                     padding={'1rem'}
                     borderLeft={'1px solid rgba(255,255,255,.1)'}
                     borderRight={'1px solid rgba(255,255,255,.1)'}
                  >
   
                     <Box className="user-profile-data">
                        <Box className="portada">
                           <img className="portada-img" src={portada}/>
                           <Box sx={{
                              width: '110px',
                              height: '110px',
                              borderRadius: '50%',
                              backgroundColor: '#ccc',
                              position: 'absolute',
                              left: '2.5rem',
                              bottom: '-2rem'
                           }}></Box>
                        </Box>
                        <Box className="profile-info">
                           <Typography typography={'p'} fontSize={'1.4rem'} fontWeight={'500'} color="#fff">{userDetails.firstname} {userDetails.lastname}</Typography>
                           
                           <Box display={'flex'} columnGap={'.5rem'} alignItems={'center'}>
                              <Typography typography={'p'} color="rgba(255,255,255, .4)" marginBottom={'.2rem'}>@{userDetails.username}</Typography>
                              { 
                                 isFollower ? 
                                 <IsFollowerCard/> 
                                 : null 
                              }
                           </Box>
                           <Typography typography={'p'} color="rgba(255,255,255, .55)" marginBottom={'.5rem'}>Joined in {userDetails.uploadDate}.</Typography>
                           <Typography typography={'p'} color="#fff" marginBottom={'1rem'}>{userDetails.description}</Typography>
                           <Box 
                              display={'flex'}
                              alignItems={'center'} 
                              columnGap={'.7rem'}
                           >
                              <Box
                                 component={'button'}
                                 display={'flex'}
                                 alignItems={'center'}
                                 gap={'.5rem'}
                                 onClick={() => {
                                    setShowFollowing(true); 
                                    setShowFollowers(false);
                                 }}
                              >
                                 <Typography typography={'p'} color="#fff" fontSize={'.95rem'} fontWeight={'300'}>
                                    Following
                                 </Typography>
                                 
                                 <Typography typography={'p'} color="#fff" fontSize={'1rem'} fontWeight={'400'}>
                                    {numberOfFollowing}
                                 </Typography>
                              </Box>
   
                              <Box
                                 width={'1px'}
                                 height={'25px'}
                                 sx={{backgroundColor: 'rgba(255,255,255, .2)'}}
                              >
                              </Box>

                              <Box
                                 component={'button'}
                                 display={'flex'}
                                 alignItems={'center'}
                                 gap={'.5rem'}
                                 onClick={() => {
                                    setShowFollowing(false); 
                                    setShowFollowers(true);
                                 }}
                              >
                                 <Typography typography={'p'} color="#fff" fontSize={'.95rem'} fontWeight={'300'}>
                                    Followers
                                 </Typography>
                                 <Typography typography={'p'} color="#fff" fontSize={'1rem'} fontWeight={'400'}>
                                    {numberOfFollowers}
                                 </Typography>
                              </Box>
                           </Box>

                           {
                              userDetails.username === authUser.username ? 
                                 <Box 
                                    component={'button'} 
                                    className="profile-btn edit-profile-btn"
                                    onClick={() => {
                                       if(!editMode) setEditMode(true); 
                                          else setEditMode(false)
                                    }}
                                 >
                                    Edit Profile
                                 </Box>
                              : userDetails.username != authUser.username ?
                              <FollowUnfollowBtn prop={'profile-btn'} username={userDetails.username}/>
                        : null
                           }
                           
                           <Box
                              display={'flex'}
                              alignItems={'center'}
                              marginTop={'1rem'}
                              justifyContent={'space-evenly'}
                              columnGap={'0'}
                           >

                              {sections.map(section => (
                                 <Box 
                                    key={section}
                                    component={'button'}
                                    className={`profile-sections-btn ${activeSection === section ? 'profile-sections-btn-active' : ""}`}
                                    onClick={() => setActiveSection(section)}
                                 >
                                    {section}
                                 </Box>
                              ))}
                           </Box>     
                        </Box>
                     </Box>

                     <Feed postList={userFeed}/>

                     <Box ref={scrollTargetRef}></Box>
                  </Box>
                  <Box position={"relative"} width={'25%'}>
                     <TrendsCard propClass={'p-trends-card'}/>
                  </Box>
               </Box>
            </Box>
         }
         
      </Box>
   )
}

export default UserProfilePage