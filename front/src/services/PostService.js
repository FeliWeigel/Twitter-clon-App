import axios from "axios"
import { uploadPostEndPoint } from "../utils/ApiURLs"

const PostService = {
    createPost: async (token, postDTO) =>  {
        const res = await axios.post(uploadPostEndPoint, postDTO, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(err => {
            console.error(err);
            throw err;
        })

        return res.data;
    },
    /////
};

export default PostService;