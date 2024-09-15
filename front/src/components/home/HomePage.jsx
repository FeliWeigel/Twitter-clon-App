import { useCallback, useEffect, useRef, useState } from "react"

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

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [feed, setFeed] = useState([]);
  const [hasMore, setHasMore] = useState(true); 
  const [newPosts, setNewPosts] = useState([]); 
  const scrollTargetRef = useRef(null); 

  //inicializar el feed y los datos de usuario
  const initializeFeed = useCallback(async () => {
    const token = sessionStorage.getItem("acc_token");
    if (!token) {
      setLoading(false);
      return;
    }
    if (!userProfile) {
      const profile = await UserService.getUserProfile(token);
      setUserProfile(profile);
    }

    // Cargar la primera página de posts
    const res = await PostService.getFeed(token, 0, size);
    const initialFeed = res.content || [];
    setFeed(initialFeed);
    setPage(1); // Empezamos desde la página 1 (la 0 ya se cargó)
    setHasMore(initialFeed.length >= size); // Determinar si hay más posts
    setLoading(false);
  }, [userProfile, size]);

  // definir si hay nuevos posts y setearlos
  const fetchNewPosts = useCallback(async () => {
    const token = sessionStorage.getItem("acc_token");
    const res = await PostService.getFeed(token, 0, size); // Consulta los últimos posts
    const latestPosts = res.content || [];

    const currentFeed = feed;
    const unseenPosts = latestPosts.filter(post => !currentFeed.some(p => p.id === post.id));

    if (unseenPosts.length > 0) {
      setNewPosts(unseenPosts);
    }
  }, [feed, size]);

  //cargar una nueva pagina de posts
  const fetchNewPage = useCallback(async () => {
    if (!hasMore || loading) return;

    const token = sessionStorage.getItem("acc_token");
    const res = await PostService.getFeed(token, page, size);
    const newFeed = res.content || [];

    setFeed(prevFeed => [...prevFeed, ...newFeed]); // Añadir nuevos posts al final
    setPage(prevPage => prevPage + 1); // Incrementar la página
    setHasMore(newFeed.length >= size); // Verificar si hay más posts
    setLoading(false);
  }, [page, size, hasMore, loading]);

  useEffect(() => {
    initializeFeed();
  }, [initializeFeed])


  useEffect(() => {
    const interval = setInterval(fetchNewPosts, 10000)
  
    return () => clearInterval(interval);
  }, [fetchNewPosts]); 

  useEffect( () => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        fetchNewPage();
      }
    }, { threshold: 1.0 });
    
    const target = scrollTargetRef.current;
    
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [loading, fetchNewPage]);

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
             
              {newPosts.map((post, index) => {
                return (
                  <PostCard key={index} post={post}/>
                )
              })}

              {feed.map((post, index) => {
                return (
                 <PostCard key={index} post={post}/>
                )
              })}
              {loading && <Typography typography={'p'} color="#fff">Loading...</Typography>}
              <Box ref={scrollTargetRef}></Box>
           </Box>
           <Box position={"relative"} width={'25%'}>
              <TrendsCard/>
           </Box>
        </Box>
    </Box>
  )
}

export default HomePage;