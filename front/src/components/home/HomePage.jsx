import { useCallback, useEffect, useRef, useState } from "react"

import "../../index.css"
import "../../css/home.css"
import { Box, Typography } from "@mui/material"

import UserService from "../../services/UserService.js"
import ProfileCard from "../cards/ProfileCard.jsx"
import WhoFollowCard from "../cards/WhoFollowCard.jsx"
import NewPostCard from "../cards/NewPostCard.jsx"
import TrendsCard from "../cards/TrendsCard.jsx"
import Nav from "../nav/Nav"
import PostCard from "../cards/PostCard.jsx"
import PostService from "../../services/PostService.js"
import Loading from "../../utils/Loading.jsx"

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [feed, setFeed] = useState([]);
  const [hasMore, setHasMore] = useState(true); 
  const [newPosts, setNewPosts] = useState([]); 
  const [newPostLength, setNewPostLength] = useState(0)
  const scrollTargetRef = useRef(null); 
  const loadNewPostsBtn = useRef(null);

  //inicializar el feed y los datos de usuario
  const initializeFeed = useCallback(async () => {
    const token = sessionStorage.getItem("acc_token");
    
    if (!userProfile) {
      const profile = await UserService.getAuthUserProfile(token);
      setUserProfile(profile);
    }

    // Cargar la primera página de posts
    const res = await PostService.getFeed(token, 0, size);
    const initialFeed = res.content || [];
    setFeed(initialFeed);
    setPage(1); // Empezamos desde la página 1 (la 0 ya se cargo)
    setHasMore(initialFeed.length >= size); // Determino si hay mas posts
    setLoading(false);
  }, [userProfile, size]);

  useEffect(() => {
    initializeFeed();
  }, [initializeFeed])

  // Detecto nuevos posts y, en caso de disponibilidad, le sugiero al usuario cargarlos al principio del feed (esta solicitud se hara en intervalos de tiempo especificos) 
  const recomendNewPosts = useCallback(async () => {
    const token = sessionStorage.getItem("acc_token");
    const lastPostDate = feed.length > 0 ? feed[0].date : null;

    if (!lastPostDate) return;

    const res = await PostService.getNewPosts(token, lastPostDate); // Consulta los últimos posts
    const unseenPosts = res || []
    const unseenFiltered = unseenPosts.filter(post => !feed.some(f => f.id === post.id));

    if (unseenFiltered.length > 5) {
      setNewPostLength(unseenFiltered.length)
      setNewPosts(unseenFiltered)
    }
  },[feed])

  // Cargo los nuevos post al principio del feed
  const fetchNewPosts = useCallback(() => { 
    setFeed(prevFeed => [...newPosts, ...prevFeed]); 
    setNewPostLength(0);
    setNewPosts([]);
  
  }, [newPosts]);

  //Carga de una nueva pagina de posts al scrollear hacia abajo 
  // (me aseguro de cargar una cantidad limitada de datos y no tener que fetchear todos los post almacenados, lo que generaria muchos problemas de rendimiento por la cantidad de datos que se estarian solicitando)
  const fetchNewPage = useCallback(async () => {
    if (!hasMore || loading) return;

    const token = sessionStorage.getItem("acc_token");
    const res = await PostService.getFeed(token, page, size);
    const newFeed = res.content || [];
    const newFeedFiltered = newFeed.filter(post => !feed.some(f => f.id === post.id));

    setFeed(prevFeed => [...prevFeed, ...newFeedFiltered]); // Añadir nuevos posts al final
    setPage(prevPage => prevPage + 1); // Incrementar la página
    setHasMore(newFeed.length >= size); // Verificar si hay más posts
    setLoading(false);
  }, [page, size, hasMore, loading]);

  // Polling. Recurrentemente hago una peticion para detectar nuevos posts y sugerirle al usuario cargarlos en feed
  useEffect(() => {
    const interval = setInterval(recomendNewPosts, 20000)
  
    return () => clearInterval(interval);
  }, [recomendNewPosts]); 

  // Observer para la deteccion de scroll por parte del usuario.
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
    <Box className="container h-container" sx={{
      backgroundColor: '#05131C'
    }}> 
        <Nav/>
        <Box className="home">
           <Box position={"relative"} width={'25%'}>
              {loading ? 
                <Box className="loading-container">
                  <Loading size={'2rem'}/>
                </Box>
              : 
                
                <ProfileCard user={userProfile} propClass={'h-profile-card'}/>
              }
              <WhoFollowCard propClass={'h-card-whofollow'}/>
           </Box>
           <Box 
              position={"relative"} 
              display={'flex'} 
              flexDirection={'column'}
              rowGap={'1.5rem'}
              width={'53%'}
            >
              <NewPostCard propClass={'h-card-new-post'}/>

              <Box className={`update-postlist-btn ${newPostLength > 5 ? 'display' : 'undisplay'}`} ref={loadNewPostsBtn} onClick={fetchNewPosts}>
                  <Typography typography={'p'}>There are {newPostLength} new posts! Click to load.</Typography>
              </Box> 

              {feed.map((post) => {
                return (
                 <PostCard key={post.id} post={post}/>
                )
              })}

              {loading && 
                <Box className="loading-container">
                  <Loading size={'2rem'}/>
                </Box>
              }
              <Box ref={scrollTargetRef}></Box>
           </Box>
           <Box position={"relative"} width={'25%'}>
              <TrendsCard propClass={'h-card-trends'}/>
           </Box>
        </Box>
    </Box>
  )
}

export default HomePage;