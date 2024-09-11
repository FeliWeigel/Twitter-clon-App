import "../../index.css"
import "../../css/auth.css"

import  authBg from "../../assets/imgs/registerWall.png"
import { Alert, Box, Button, TextField } from "@mui/material"
import { Link } from "react-router-dom"
import { FaTwitter } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react"
import { registerEndPoint } from "../../utils/ApiURLs"
import axios from "axios"

export const RegisterPage = () => {
    const [request, setRequest] = useState(
        {
            firstname: "",
            lastname: "",
            username: "",
            birthdate: "",
            email: "",
            password: "",
            repeatPassword: ""
        }
    );
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [response, setResponse] = useState("");

    const handleInputChange = (e) => {
        setRequest(request => ({
            ...request, 
            [e.target.name]: e.target.value
        }));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    const handleRegister = () => {
        const URL = registerEndPoint;
        axios.post(URL, request)
        .then(res => {
            const success = res.status === 201 ? true : false;
            if(success){
                setError(false);
                setSuccess(true);
                setResponse(`You have successfully registered. Welcome ${request.firstname}!`);
            }
        })
        .catch(err => {
            setSuccess(false);
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
                    position: 'relative'
                }}>
                        <img className="auth-bg" src={authBg}/>
                        {
                            success ? 
                                <Alert className="alert success-alert" severity="success">{response} <Link className="success-register-link" to="/auth/login">Log in here!<FaArrowRight/></Link></Alert> 
                            : error ? 
                                <Alert className="alert error-alert" severity="error">{response}</Alert> 
                            : null
                        }
                </Box>
                <Box  width={'40%'} component={"form"} onSubmit={handleFormSubmit} sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    rowGap: '.7rem',
                    background: '#15202B',
                    padding: '2rem',
                    borderTopRightRadius: '11px',
                    borderBottomRightRadius: '11px',
                    height: ' 100%'
                }}>
                    <Box display={'flex'} justifyContent={'center'} marginBottom={'.2rem'}>
                        <FaTwitter size={40} color="#1a90d9" ></FaTwitter>
                    </Box>

                    <Box display={'flex'} gap={'1rem'}>
                        <TextField className="auth-input" onChange={handleInputChange} label="firstname" name="firstname" type="text" 
                             sx={{
                                '& .MuiInputBase-root': {
                                    height: '40px !important',
                                    color: 'rgba(255, 255, 255, .8)',
                                    fontSize: '.9rem'
                                },
                                '& .MuiInputLabel-root': {
                                    top: '-7px',
                                    color: "#69747F"
                                },
                                '& .MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -1px) scale(0.75)',  // Ajusta el label flotante
                                },
                                '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#69747F'
                                },
                                '& input::placeholder': {
                                    color: 'gray',
                                    fontSize: '14px',  // Ajusta el tamaño del texto del placeholder
                                    fontWeight: 'bold', // Aplica negrita al texto del placeholder
                                }
                            }}></TextField>
                        <TextField className="auth-input" onChange={handleInputChange} label="lastname" name="lastname" type="text"
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '40px',
                                    color: 'rgba(255, 255, 255, .8)',
                                    fontSize: '.9rem'
                                    
                                },
                                '& .MuiInputLabel-root': {
                                    top: '-7px', 
                                    color: "#69747F"
                                },
                                '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#69747F'
                                },
                                '& .MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -1px) scale(0.75)'
                                },
                            }}></TextField>
                    </Box>
                    <TextField className="auth-input" onChange={handleInputChange} name="birthdate" type="date" 
                        sx={{
                            '& .MuiInputBase-root': {
                                height: '40px',
                                color: 'rgba(255, 255, 255, .8)',
                                fontSize: '.9rem'
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
                    <TextField className="auth-input" onChange={handleInputChange} label="email" name="email" type="email"
                        sx={{
                            '& .MuiInputBase-root': {
                                height: '40px',
                                color: 'rgba(255, 255, 255, .8)',
                                fontSize: '.9rem'
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
                    <TextField className="auth-input" onChange={handleInputChange} label="username" name="username" type="text"
                        sx={{
                            '& .MuiInputBase-root': {
                                height: '40px',
                                color: 'rgba(255, 255, 255, .8)',
                                fontSize: '.9rem'
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
                    <Box display={'flex'} gap={'1rem'}>
                        <TextField className="auth-input" onChange={handleInputChange} label="password" name="password" type="password"
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '40px',
                                    color: 'rgba(255, 255, 255, .8)',
                                    fontSize: '.9rem'
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
                        <TextField className="auth-input" onChange={handleInputChange} label="repeat password" name="repeatPassword" type="password"
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '40px',
                                    color: 'rgba(255, 255, 255, .8)',
                                    fontSize: '.9rem'
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
                    </Box>

                    <Button onClick={handleRegister} variant="contained" 
                        sx={{
                            width: '40%',
                            margin: '10px auto 5px auto'
                        }}
                    >
                        Register
                    </Button>

                    <Link to="/auth/login" className="auth-link">Do you already have an account? Log in!</Link>
                </Box>
            </Box>
        </Box>
    )
}

export default RegisterPage;