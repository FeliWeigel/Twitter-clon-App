import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const OAuthRedirectPage = () => {
    const navigate = useNavigate();
     const { login } = useAuth();

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('t');
      
      if (token != null) {
        login(token);
        setTimeout(() => {
          navigate('/home');
        }, 500);
      } else {
        navigate('/auth/login');
      }
    }, [navigate, login]);
  
    return (
      <Typography 
        typography={'p'}
        fontSize={'2rem'}
        textAlign={'center'}
        marginTop={'4rem'}
      >
        Redirecting...
      </Typography>
    );
}

export default OAuthRedirectPage