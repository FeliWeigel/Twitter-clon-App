/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import "../../css/btns.css"
import UserService from '../../services/UserService'
import { Box } from '@mui/material'

const FollowUnfollowBtn = ({prop, username}) => {
  const [isFollowed, setIsFollowed] = useState(false)

  const fetchUser = async () => {
    const token = sessionStorage.getItem("acc_token")
    const isFollowed = await UserService.isFollowed(token, username);
    if(isFollowed != null){
       setIsFollowed(isFollowed);
    }
  }

  const handleFollow = () => {
    const token = sessionStorage.getItem("acc_token")
    UserService.followUser(token, username);
    setIsFollowed(true)
  }
  const handleUnfollow = () => {
    const token = sessionStorage.getItem("acc_token")
    UserService.unfollowUser(token, username);
    setIsFollowed(false)
  }

  useEffect(() => {
    fetchUser();
  },[username, isFollowed]) 

  return (
    <>
      {isFollowed ? 
        <Box 
          component={'button'}
          className={`following-btn ${prop}`}
          onClick={handleUnfollow}
        >Following</Box>
        : 
        <Box 
          component={'button'} 
          className={`follow-btn ${prop}`}
          onClick={handleFollow}
        >Follow</Box>
      }
    </>
  )
}

export default FollowUnfollowBtn