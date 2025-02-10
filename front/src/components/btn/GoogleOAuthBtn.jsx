import "../../index.css"
import "../../css/auth.css"
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";

const GoogleOAuthBtn = () => {
  return (
    <Link to="http://localhost:8080/oauth2/authorization/google" className="oauth-link">Log in with Google <FcGoogle size={18}></FcGoogle></Link>
  )
}

export default GoogleOAuthBtn