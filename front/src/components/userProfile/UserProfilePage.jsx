/* eslint-disable react/prop-types */
import "../../index.css"
import "../../css/userProfile.css"
import { Box, Typography } from "@mui/material"
import Nav from "../nav/Nav"
import WhoFollowCard from "../cards/WhoFollowCard"
import PostCard from "../cards/PostCard"
import TrendsCard from "../cards/TrendsCard"
import portada from "../../assets/imgs/registerWall.png"
import UserService from "../../services/UserService"
import { useCallback, useEffect, useRef, useState } from "react"
import Loading from "../../utils/Loading"
import FollowBtn from "../btn/FollowBtn"
import FollowingBtn from "../btn/FollowingBtn"
import PostService from "../../services/PostService"
import { useParams } from "react-router-dom"

const UserProfilePage = () => {
   const [userDetails, setUserDetails] = useState(null);
   const [numberOfFollowers, setNumberOfFollowers] = useState(0)
   const [numberOfFollowing, setNumberOfFollowing] = useState(0)
   const [loading, setLoading] = useState(true);
   const [userFeed, setUserFeed] = useState([]);
   const scrollTargetRef = useRef(null); 
   const [page, setPage] = useState(0);
   const [activeSection, setActiveSection] = useState('Posts')
   const sections = ['Posts', 'Posts and Replies', 'Multimedia', 'Likes']
   const userUsername = useParams('username').username

   const fetchNewPage = useCallback(async () => {
      const token = sessionStorage.getItem("acc_token");
      if(userDetails && token){
         const res = await PostService.postsByUser(token, userDetails.username, page);
         const newFeed = res._embedded.postDTOes || [];
     
         setUserFeed(prevFeed => [...prevFeed, ...newFeed]); 
         setPage(prevPage => prevPage + 1); 
         setLoading(false);
      }
   }, [page, loading]);
   
   useEffect(() => {
      const token = sessionStorage.getItem("acc_token")
      const fetchUserDetails = async () => {
         if(token){
            const res = await UserService.getAllUserDetails(token, userUsername);
            console.log(res)
            if(res){
               setUserDetails(res.profile)
               setNumberOfFollowers(res.followers)
               setNumberOfFollowing(res.following)
               setLoading(false)
            }
         }else {
            setLoading(true)
         }
      }
      fetchUserDetails();
   },[])

   useEffect(() => {
      const initializeFeed = async () => {
         await fetchNewPage();
      }

      if(userDetails){
         initializeFeed()
      }
   }, [userDetails])

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
      <Box className="container p-container" sx={{
         backgroundColor: '#05131C'
         }}> 
            <Nav/>
            <Box className="profile">
               <Box position={"relative"} width={'25%'}>
                  <WhoFollowCard/>
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
                  {loading ? <Loading size={30}/> : 
                  
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
                              <Typography typography={'p'} color="rgba(255,255,255, .4)" marginBottom={'.2rem'}>@{userDetails.username}</Typography>
                              <Typography typography={'p'} color="rgba(255,255,255, .55)" marginBottom={'.5rem'}>Joined in {userDetails.uploadDate}.</Typography>
                              <Typography typography={'p'} color="#fff" marginBottom={'1rem'}>{userDetails.description}</Typography>
                              <Box 
                                 display={'flex'}
                                 alignItems={'center'} 
                                 columnGap={'.7rem'}
                              >
                                 <Box
                                    display={'flex'}
                                    alignItems={'center'}
                                    gap={'.5rem'}
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
                                    display={'flex'}
                                    alignItems={'center'}
                                    gap={'.5rem'}
                                 >
                                    <Typography typography={'p'} color="#fff" fontSize={'.95rem'} fontWeight={'300'}>
                                       Followers
                                    </Typography>
                                    <Typography typography={'p'} color="#fff" fontSize={'1rem'} fontWeight={'400'}>
                                       {numberOfFollowers}
                                    </Typography>
                                 </Box>
                              </Box>
                              
                              <Box component={'button'} className="profile-btn edit-profile-btn">Edit Profile</Box>
                              {userDetails === "a" ? <FollowBtn prop={'profile-btn'}/> : null}
                              {userDetails === "a" ? <FollowingBtn prop={'profile-btn'}/> : null}

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
                  
                  }
                  
                  {
                     loading ? <Loading size={35}/> 
                        : 
                     userFeed.map((post) => (
                        <PostCard key={`${post.date + post.text}`} post={post}/>
                     ))
                  }

                  <Box ref={scrollTargetRef}></Box>

               </Box>
               <Box position={"relative"} width={'25%'}>
                  <TrendsCard propClass={'p-trends-card'}/>
               </Box>
            </Box>
         </Box>
   )
}

export default UserProfilePage