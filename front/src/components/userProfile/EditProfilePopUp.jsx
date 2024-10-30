/* eslint-disable react/prop-types */
import "../../index.css"
import "../../css/userProfile.css"
import { Alert, Box } from "@mui/material"
import portada from "../../assets/imgs/registerWall.png"
import { useEffect, useState } from "react"
import UserService from "../../services/UserService"
import Loading from "../../utils/Loading"

const EditProfilePopUp = ({userDetails}) => {
    const [loading, setLoading] = useState(false)
    const [editedUserDetails, setEditedUserDetails] = useState({
        firstname: "",
        lastname: "",
        description: "",
        link: ""
    })
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        setEditedUserDetails({
            firstname: userDetails.firstname || '',
            lastname: userDetails.lastname || '',
            description: userDetails.description || '',
            link: userDetails.link || ''
        });
    }, [userDetails]);

    const handleChange = async (e) => {
        setEditedUserDetails({
            ...editedUserDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const saveChanges = async () => {
        const token = sessionStorage.getItem("acc_token")
        setLoading(true)
        if(token){
            const res = await UserService.editProfileInfo(token, editedUserDetails);  
            setMessage(res.data)
            if(res.status === 200){
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false);
                    setMessage("");
                }, 4000); 
            }else {
                setError(true)
                setTimeout(() => {
                    setError(false);
                    setMessage("");
                }, 4000);
            }
            setLoading(false)
        }
    }

    return (
        <Box
            width={'50%'}
            height={'90%'}
            zIndex={'10000'}
            borderRadius={'10px'}
            overflow={'scroll'}
            sx={{
                background: '#1d2b35 !important',
                overflowX: 'hidden',
            }}
        >
            {message && error ? <Alert className="alert error-alert" severity="error">{message}</Alert> 
                : message && success ?  <Alert className="alert success-alert" severity="success">{message}</Alert> : null
            }
            <Box className="portada edit-portada">
                <img className="portada-img edit-portada-img" src={portada}/>
                <Box sx={{
                    width: '82px',
                    height: '82px',
                    borderRadius: '50%',
                    backgroundColor: '#ccc',
                    position: 'absolute',
                    left: '2.5rem',
                    bottom: '-2rem'
                }}></Box>
            </Box>
            <Box component={"form"} onSubmit={handleSubmit} className="profile-info edit-profile-info scroll-box">
                <Box display={'flex'} columnGap={'.8rem'} width={'100%'}>
                    <Box display={'flex'} flexDirection={'column'} rowGap={'.3rem'} width={'100%'}>
                        <Box component={'label'} className="edit-profile-label">Firstname</Box>
                        <Box component={'input'} type="text" defaultValue={userDetails.firstname} name="firstname" className="edit-profile-input" onChange={handleChange}></Box>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} rowGap={'.3rem'} width={'100%'}>
                        <Box component={'label'} className="edit-profile-label">Lastname</Box>
                        <Box component={'input'} type="text" defaultValue={userDetails.lastname} name="lastname" className="edit-profile-input" onChange={handleChange}></Box>
                    </Box>
                </Box>
                <Box display={'flex'} flexDirection={'column'} rowGap={'.3rem'}>
                    <Box component={'label'} className="edit-profile-label">Description</Box>
                    <Box component={'textarea'} type="text" defaultValue={userDetails.description} maxLength={150} placeholder="Insert your description here.." rows={3} className="edit-profile-input edit-profile-txt" name="description" onChange={handleChange}></Box>
                </Box>
                <Box display={'flex'} flexDirection={'column'} rowGap={'.3rem'} width={'100%'}>
                    <Box component={'label'} className="edit-profile-label">Link or Website</Box>
                    <Box component={'input'} type="text" defaultValue={userDetails.link} name="link" className="edit-profile-input" onChange={handleChange}></Box>
                </Box>
                <Box className="save-profile-btn" component={'button'} onClick={saveChanges} display={'block'}>
                    {loading ? <Loading size={15}/> : 'Confirm changes'}
                </Box>
            </Box>
        </Box>

    )
}

export default EditProfilePopUp