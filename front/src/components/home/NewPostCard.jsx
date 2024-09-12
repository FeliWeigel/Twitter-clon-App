/* eslint-disable react/prop-types */
import "../../index.css";
import "../../css/home.css";
import PostService from "../../services/PostService.js";

import { Alert, Box, Card } from "@mui/material";
import { TbPhotoFilled } from "react-icons/tb";
import { FaVideo } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

const NewPostCard = () => {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [photoPreviewURL, setPhotoPreviewURL] = useState(null);
    const [videoPreviewURL, setVideoPreviewURL] = useState(null);

    const fileInputRef = useRef(null);
    const textInputRef = useRef(null);
    const errorAlert = useRef(null)
    const successAlert = useRef(null)


    const clearForm = {
        clearText: () => {
            if (textInputRef.current) {
                setText('');
                textInputRef.current.value = '';
            }
        },
        clearFile: () => {
            if(fileInputRef.current){
                setFile(null);
                fileInputRef.current.value = ''; 
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadPost()
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile);

        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const fileURL = URL.createObjectURL(selectedFile);
            setVideoPreviewURL(null);
            setPhotoPreviewURL(fileURL);
        }else if(selectedFile && selectedFile.type.startsWith('video/')){
            const fileURL = URL.createObjectURL(selectedFile);
            setPhotoPreviewURL(null);
            setVideoPreviewURL(fileURL);
        }else {
            setPhotoPreviewURL(null);
            setVideoPreviewURL(null);
        }

    }

    const handleInputFileClick = () => {
        fileInputRef.current.click();
        clearForm.clearFile()
    }
    
    const uploadPost = () => {
        const token = sessionStorage.getItem("acc_token")
        const postDTO = new FormData();
       
        postDTO.append("text", text);
        if(file){
            postDTO.append("file", file);
        }

        PostService.createPost(token, postDTO)
        .then(res => {
            setSuccess(true);
            setMessage(res);
            clearForm.clearText()
            clearForm.clearFile()
            setPhotoPreviewURL(null);
            setVideoPreviewURL(null);
        })
        .catch(() =>{
            setError(true);
            setMessage("Unexpected error. The post could not be uploaded correctly, please try again later.");
        })
    }

    useEffect(() => {
        let timer;

        if(error || success){
            timer = setTimeout(() => {
                setError(false)
                setSuccess(false)
                setMessage('')
                if (errorAlert.current) {
                    errorAlert.current.classList.remove("show-alert");
                }
                if (successAlert.current) {
                    successAlert.current.classList.remove("show-alert");
                }
                
            }, 5000)
        }

        return () => clearTimeout(timer)
    },[error, success])

    return (
        <Card className="h-card h-card-new-post">
            { 
                error ? <Alert className={`new-post-alert ${error ? "show-alert" : ""}`} ref={errorAlert} severity="error">{message}</Alert> 
                : success ? <Alert className={`new-post-alert ${success ? "show-alert" : ""}`} ref={successAlert}  severity="success">{message}</Alert> 
                : null
            }
            <Box display={'flex'} gap={'1rem'} alignItems={'center'}>
                <Box component={"form"} encType="multipart/form-data" onSubmit={handleSubmit} width={'100%'}>
                    <Box display={'flex'} alignItems={'center'} gap={'1rem'}>
                        <Box sx={{
                            width: '47px',
                            height: '37px',
                            borderRadius: '50%',
                            backgroundColor: '#ccc'
                        }}></Box>
                        <Box component={'input'} type="text" ref={textInputRef} onChange={handleTextChange} placeholder="What's happening?!"  maxLength={250} color={'#fff'} 
                            sx={{
                            background: '#2a3a45',
                            padding: '.8rem 1rem',
                            width: '100%',
                            borderRadius: '7px',
                            "::placeholder": {
                                color: 'rgba(255,255,255, .7)'
                            }
                            }}>
                        </Box>
                        <Box component={'input'} type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
    
                        <Box className="post-btn" component={"button"} type="submit">Post</Box>
                    </Box>
                    {
                        photoPreviewURL ? (
                            <img src={photoPreviewURL} alt="Photo Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                        ) 
                        : videoPreviewURL ? (
                            <video src={videoPreviewURL} alt="Video Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                        ) 
                        : null
                    }
                    <Box display={'flex'} gap={'1rem'} alignItems={'center'} marginTop={'1rem'}>
                        <Box 
                            component={'button'}
                            className="post-option-add"
                            type="button"
                            onClick={handleInputFileClick}
                        >
                            <TbPhotoFilled className="post-photo-icon" size={20} color="rgb(0, 193, 0)" /> Photo
                        </Box>
                        <Box 
                            component={'button'} 
                            className="post-option-add"
                        >
                            <FaVideo className="post-photo-icon" size={20} color="rgb(25, 25, 255)" /> Video
                        </Box>
                        <Box 
                            component={'button'} 
                            className="post-option-add"
                        >
                            <IoCalendar className="post-photo-icon" size={20} color="rgb(252, 164, 0)" /> Schedule
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}

export default NewPostCard