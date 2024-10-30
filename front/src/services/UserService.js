import axios from "axios"
import { isFollowedUserEndPoint, isFollowerUserEndPoint, logoutEndPoint, userCountFollowersEndPoint, userCountFollowingEndPoint, userFollowEndPoint, userFollowersEndPoint, userFollowingEndPoint, userProfileEndPoint, userUnfollowEndPoint } from "../utils/ApiURLs"

const UserService = {
    config: (token) => {
        return { 
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    },
    getAuthUserProfile: async (token) => {
        const res = await axios.get(userProfileEndPoint, UserService.config(token));
        return res.data;
    },
    getUserProfile: async (token, username) =>  {
        const res = await axios.get(`${userProfileEndPoint}/${username}`, UserService.config(token));
        return res.data;
    },
    logout: async () => {
        const res = await axios.post(logoutEndPoint).catch(err => {throw err});

        return res.data;
    },
    followUser: async (token, username) => {
        const res = await axios.post(`${userFollowEndPoint + username}`, null, UserService.config(token)).catch(err => {throw err})
        return res.data
    },
    unfollowUser: async (token, username) => {
        const res = await axios.post(`${userUnfollowEndPoint + username}`, null, UserService.config(token)).catch(err => {throw err})
        return res.data
    },
    countFollowers: async (token, username) => {
        const res = await axios.get(`${userCountFollowersEndPoint + username}`, UserService.config(token)).catch(err => {throw err})
        return res.data;
    },
    countFollowing: async (token, username) => {
        const res = await axios.get(`${userCountFollowingEndPoint + username}`, UserService.config(token)).catch(err => {throw err})
        return res.data;
    },
    getFollowingPage: async (token, username, page) => {
        const res = await axios.get(`${userFollowingEndPoint + username}?page=${page}`, UserService.config(token)).catch(err => {throw err})
        return res.data
    },
    getFollowersPage: async (token, username, page) => {
        const res = await axios.get(`${userFollowersEndPoint + username}?page=${page}`, UserService.config(token)).catch(err => {throw err})
        return res.data
    },
    isFollowed: async (token, username) => {
        const res = await axios.get(`${isFollowedUserEndPoint + username}`, UserService.config(token)).catch(err => {throw err})
        
        return res.data
    },
    isFollower: async(token, username) => {
        const res = await axios.get(`${isFollowerUserEndPoint + username}`,  UserService.config(token)).catch(err => {throw err})
        return res.data
    },
    getAllUserDetails: async (token, username) => {
        const userProfile = await UserService.getUserProfile(token, username);
        const authUserProfile = await UserService.getAuthUserProfile(token);
        const numberOfFollowers = await UserService.countFollowers(token, username);
        const numberOfFollowing = await UserService.countFollowing(token, username);
        let res = {
            profile: userProfile,
            authUser: authUserProfile,
            followers: numberOfFollowers,
            following: numberOfFollowing
        }
        return res
    }
};

export default UserService;