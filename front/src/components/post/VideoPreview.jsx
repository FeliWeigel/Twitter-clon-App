/* eslint-disable react/prop-types */
import "../../index.css"
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";

const VideoPreview = ({videoKey, URL}) => {
    const videoRef = useRef(null)
    const [videoPlay, setVideoPlay] = useState(false)

    useEffect(() => {
        if(videoRef.current && videoKey){
            if(videoPlay){
                videoRef.current.play()
            }else {
                videoRef.current.pause()
            }
        }

    }, [videoPlay])

    return (
        <Box
            position={'relative'}
        >
            <video className="post-file" key={videoKey} ref={videoRef} src={URL}/> 
            {videoPlay ? 
                <FaPause
                    className="video-play-icon" 
                    size={30}
                    onClick={() => {if (videoPlay) setVideoPlay(false); else setVideoPlay(true)}}
                />
                :
                <FaPlay
                    className="video-play-icon" 
                    size={30}
                    onClick={() => {if (videoPlay) setVideoPlay(false); else setVideoPlay(true)}}
                />
            }
        </Box>
    )
}

export default VideoPreview