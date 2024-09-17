import axios from "axios"
import { logoutEndPoint, userProfileEndPoint } from "../utils/ApiURLs"

const UserService = {
    config: (token) => {
        return { 
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    },
    getUserProfile: async (token) =>  {
        const res = await axios.get(userProfileEndPoint, UserService.config(token));

        return res.data;
    },
    logout: async (token) => {
        const res = await axios.post(logoutEndPoint, UserService.config(token)).catch(err => {throw err});

        return res.data;
    }
};

export default UserService;