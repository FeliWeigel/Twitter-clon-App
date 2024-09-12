import axios from "axios"
import { userProfileEndPoint } from "../utils/ApiURLs"

const UserService = {
    getUserProfile: async (token) =>  {
        const res = await axios.get(userProfileEndPoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.data;
    },
    /////
};

export default UserService;