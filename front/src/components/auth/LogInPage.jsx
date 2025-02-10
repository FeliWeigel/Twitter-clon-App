/* eslint-disable react/no-unescaped-entities */
import "../../index.css"
import "../../css/auth.css"

import  authBg from "../../assets/imgs/registerWall.png"
import { Alert, Box, Button, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { FaTwitter } from "react-icons/fa";
import { useState } from "react"
import { loginEndPoint } from "../../utils/ApiURLs"
import axios from "axios"
import { useAuth } from "./AuthProvider"
import GoogleOAuthBtn from "../btn/GoogleOAuthBtn"


export const LogInPage = () => {
    const [request, setRequest] = useState(
        {
            username: "",
            password: ""
        }
    );
    const [error, setError] = useState(false);
    const [response, setResponse] = useState("");
    const { login } = useAuth();  // Uso de la función login del contexto
    const navigate = useNavigate(); 

    const handleInputChange = (e) => {
        setRequest(request => ({
            ...request, 
            [e.target.name]: e.target.value
        }));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    const handleLogin= () => {
        const URL = loginEndPoint;
        axios.post(URL, request)
        .then(res => {
            console.log(res)
            if(res.status === 200){
                const accessToken = res.data.access_token
                setError(false);
                login(accessToken);
                navigate("/home")
            }
        })
        .catch(err => {
            setError(true);
            setResponse(err.response.data);
        })
        
    }

    return (
        <Box className="container" sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#03244D'
        }}>
            <Box sx={{
                width: '80%',
                height: '92%',
                borderRadius: '15px',
                display: 'flex'
            }}>
                <Box width={'60%'} sx={{
                    borderTopLeftRadius: '11px',
                    borderBottomLeftRadius: '11px',
                }}>
                        <img className="auth-bg" src={authBg}/>
                </Box>
                <Box component={"form"} onSubmit={handleFormSubmit} sx={{
                    display: 'flex',
                    height: ' 100%',
                    width: '40%',
                    position: 'relative',
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    rowGap: '.7rem',
                    background: '#15202B',
                    padding: '2rem',
                    borderTopRightRadius: '11px',
                    borderBottomRightRadius: '11px',
                }}>
                    <Box display={'flex'} justifyContent={'center'} marginBottom={'.2rem'}>
                        <FaTwitter size={40} color="#1a90d9" ></FaTwitter>
                    </Box>

                        <TextField className="auth-input" onChange={handleInputChange} label="Username" name="username" type="text"
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '40px',
                                    color: 'rgba(255, 255, 255, .8)',
                                    fontSize: '.9rem',
                                    width: '220px'
                                },
                                '& .MuiInputLabel-root': {
                                    top: '-7px',
                                    color: "#69747F" 
                                },
                                '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#69747F'
                                },
                                '& .MuiInputLabel-shrink': {
                                    transform: 'translate(13px, -1px) scale(0.75)', 
                                },
                        }}></TextField>
                        <TextField className="auth-input" onChange={handleInputChange} label="password" name="password" type="password"
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '40px',
                                    color: 'rgba(255, 255, 255, .8)',
                                    fontSize: '.9rem',
                                    width: '220px'
                                },
                                '& .MuiInputLabel-root': {
                                    top: '-7px',
                                    color: "#69747F" 
                                },
                                '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#69747F'
                                },
                                '& .MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -1px) scale(0.75)',
                                },
                        }}></TextField>
                    <Button onClick={handleLogin} variant="contained" 
                        sx={{
                            width: '40%',
                            margin: '10px auto 5px auto'
                        }}
                    >
                        Log In
                    </Button>   
                    
                    <Link to="/auth/register" className="auth-link">You still don't have an account? Register!</Link>
                    {
                            error ? 
                                <Alert className="alert login-error-alert" severity="error">{response}</Alert> 
                            : null
                    }
                    
                    <GoogleOAuthBtn/>
                </Box>

            </Box>
        </Box>
    )
}
export default LogInPage;