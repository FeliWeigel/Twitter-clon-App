import axios from "axios"
import { logoutEndPoint, userCountFollowersEndPoint, userCountFollowingEndPoint, userFollowersEndPoint, userFollowingEndPoint, userProfileEndPoint } from "../utils/ApiURLs"

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
    logout: async (token) => {
        const res = await axios.post(logoutEndPoint, UserService.config(token)).catch(err => {throw err});

        return res.data;
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
        console.log(res)
        return res.data
    },
    getAllUserDetails: async (token, username) => {
        const userProfile = await UserService.getUserProfile(token, username);
        const numberOfFollowers = await UserService.countFollowers(token, username);
        const numberOfFollowing = await UserService.countFollowing(token, username);
        let res = {
            profile: userProfile,
            followers: numberOfFollowers,
            following: numberOfFollowing
        }
        return res
    }
};

export default UserService;