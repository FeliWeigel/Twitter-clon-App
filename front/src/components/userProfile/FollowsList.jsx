/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Box, Typography } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import UserService from '../../services/UserService'
import Loading from '../../utils/Loading';
import UserCard from '../cards/UserCard';

const FollowsList = ({type, username}) => {

    const [usersList, setUsersList] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Estado para controlar si hay más datos
    const scrollTargetRef = useRef(null);

    const fetchNewPage = useCallback(async () => {
        const token = sessionStorage.getItem("acc_token");
        if (!token || loading || !hasMore) return; // Salir si falta el token o ya está cargando

        setLoading(true);
        try {
            let res;
            if (type === "Following") {
                res = await UserService.getFollowingPage(token, username, page);
            } else if (type === "Followers") {
                res = await UserService.getFollowersPage(token, username, page);
            }

            const newList = res?._embedded?.userDTOes || [];
            setUsersList(prevList => page === 0 ? newList : [...prevList, ...newList]);
            setPage(prevPage => prevPage + 1);
            setHasMore(newList.length > 0); // Si la nueva lista está vacía, no hay más datos
        } catch (error) {
            console.error("Error loading users:", error);
        } finally {
            setLoading(false);
        }
    }, [page, type, username, loading, hasMore]);

    useEffect(() => {
        fetchNewPage();
    }, []); 

    useEffect(() => {
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
    }, [fetchNewPage, loading]);

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
                    !loading && usersList.length === 0 ?
                        <Typography typography={'p'} color='rgba(255,255,255, .7)' fontSize={'1.2rem'} textAlign={'center'}>
                            {
                                type === "Following" ? "The followed list is empty!" 
                                : type === "Followers" ? "The followers list is empty!" 
                                : null
                            }
                        </Typography>
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