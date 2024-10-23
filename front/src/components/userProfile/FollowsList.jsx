/* eslint-disable react/prop-types */

import { Box, Typography } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import UserService from '../../services/UserService'
import Loading from '../../utils/Loading';
import UserCard from '../cards/UserCard';

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
                if(page > 0) setUsersList(prevList => [...prevList, ...newList]);
                else setUsersList(newList)
                setPage(prevPage => prevPage + 1);
            }else if(type === "Followers"){
                const res = await UserService.getFollowersPage(token, username, page);
                const newList = res._embedded.userDTOes || [];
                if(page > 0) setUsersList(prevList => [...prevList, ...newList]);
                else setUsersList(newList)
                setPage(prevPage => prevPage + 1);
            }
            setLoading(false)
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
                width={'60%'}
                height={'85%'}
                zIndex={'10000'}
                sx={{background: '#1d2b35 !important'}}
            >
                <Typography typography={'p'} fontSize={'1.3rem'} color='#fff' fontWeight={'500'} marginBottom={'1.2rem'}>{type} list</Typography>
                <Box
                    className="scroll-box"
                    height={'85%'}
                    display={'flex'}
                    flexDirection={'column'}
                    rowGap={'.4rem'}
                    overflow={'scroll'}
                    sx={{overflowX: 'hidden'}}
                >
                    {loading ? 
                        <Box textAlign={'center'} paddingTop={'4rem'}><Loading size={30}/></Box> 
                        : 
                        usersList.map(user => (
                            <UserCard key={user.username} user={user}/>
                        ))
                    }
                    <Box ref={scrollTargetRef}></Box>
                </Box>
            </Box>
    )
}

export default FollowsList