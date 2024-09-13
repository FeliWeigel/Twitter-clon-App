import axios from "axios"
import { getFeedEndPoint, uploadPostEndPoint } from "../utils/ApiURLs"


const PostService = {
    config: (token) => {
        return { 
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    },
    createPost: async (token, postDTO) =>  {
        const res = await axios.post(uploadPostEndPoint, postDTO, PostService.config(token)).catch(err => {
            console.error(err);
            throw err;
        })

        return res.data;
    },
    getFeed: async (token) => {
        const res = await axios.get(getFeedEndPoint, PostService.config(token)).catch(err => {
            console.error(err);
            throw err;
        })

        return res.data;
    }
    /////
};

export default PostService;