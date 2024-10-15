/* eslint-disable react/prop-types */

import { Box, Typography } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import UserService from '../../services/UserService'
import FollowBtn from '../btn/FollowBtn';
import Loading from '../../utils/Loading';

const FollowsList = ({type, username}) => {
    const [usersList, setUsersList] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const scrollTargetRef = useRef(null)

    const fetchNewPage = useCallback(async () => {
        const token = sessionStorage.getItem("acc_token")
        if(token){
            if(type === "Following"){
                const res = await UserService.getFollowingPage(token, username, page);
                const newList = res._embedded.userDTOes || [];
                setUsersList(prevList => [...prevList, ...newList]);
                setPage(prevPage => prevPage + 1);
                setLoading(false)
            }else if(type === "Followers"){
                const res = await UserService.getFollowersPage(token, username, page);
                const newList = res._embedded.userDTOes || [];
                setUsersList(prevList => [...prevList, ...newList]);
                setPage(prevPage => prevPage + 1);
                setLoading(false)
            }
        }
    },[page, loading]);

    useEffect(() => {
        fetchNewPage()
    },[])

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
            <Box
                padding={'2rem'}
                width={'80%'}
                height={'90%'}
                zIndex={'10000'}
                sx={{background: '#1d2b35 !important'}}
            >
                <Typography typography={'p'} fontSize={'1.3rem'} color='#fff' fontWeight={'500'} marginBottom={'1.2rem'}>{type} list</Typography>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    rowGap={'.4rem'}
                    overflow={'scroll'}
                    height={'85%'}
                    sx={{scrollbarWidth: '1px'}}
                >
                    {loading ? 
                        <Box textAlign={'center'} paddingTop={'4rem'}><Loading size={30}/></Box> 
                        : 
                        usersList.map(user => (
                            <Box key={user.username} display={'flex'} alignItems={'center'} justifyContent={'space-between'} padding={'.5rem 1.1rem'} 
                                sx={{
                                    cursor: 'pointer',
                                    transition: '.4s ',
                                    ":hover": {
                                    background: '#21313d !important'
                                    }
                                }} 
                            >
                                    <Box display={'flex'} alignItems={'center'} columnGap={'1rem'}>
                                        <Box sx={{ 
                                            width: '35px',
                                            height: '35px',
                                            borderRadius: '50%',
                                            backgroundColor: '#ccc'
                                        }}></Box>
                                        <Box display={'flex'} flexDirection={'column'}>
                                            <Typography typography={'p'} color="#fff" fontSize={'.88rem'} lineHeight={'.6rem'}>{user.firstname} {user.lastname}</Typography>
                                            <Typography typography={'p'} color="rgba(255,255,255, .4)" fontSize={'.75rem'} fontWeight={'300'}>@{user.username}</Typography>
                                        </Box>
                                    </Box>
                                    
                                    <FollowBtn/>
                            </Box>
                        ))
                    }
                    <Box ref={scrollTargetRef}></Box>
                </Box>
            </Box>
    )
}

export default FollowsList