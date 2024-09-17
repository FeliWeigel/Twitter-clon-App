import axios from "axios"
import { getFeedEndPoint, getNewPostsEndPoint, uploadPostEndPoint } from "../utils/ApiURLs"


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
    getFeed: async (token, page, size) => {
        const response = await axios.get(`${getFeedEndPoint}?page=${page}&size=${size}`, PostService.config(token))
        .catch(err => {
            throw err;
        });
        return response.data;
    },
    getNewPosts: async (token, lastDate) => {
        const response = await axios.get(`${getNewPostsEndPoint}?lastPostDate=${encodeURIComponent(lastDate)}`, PostService.config(token))
        .catch(err => {
            throw err;
        });
        return response.data;
    }
};

export default PostService;