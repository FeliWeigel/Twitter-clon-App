/* eslint-disable react/prop-types */
import "../../index.css"
import "../../css/userProfile.css"
import { Box } from "@mui/material"
import portada from "../../assets/imgs/registerWall.png"

const EditProfilePopUp = ({userDetails}) => {
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
        <Box className="profile-info edit-profile-info scroll-box">
            <Box display={'flex'} columnGap={'.8rem'} width={'100%'}>
                <Box display={'flex'} flexDirection={'column'} rowGap={'.3rem'} width={'100%'}>
                    <Box component={'label'} className="edit-profile-label">Firstname</Box>
                    <Box component={'input'} type="text" defaultValue={userDetails.firstname} name="firstname" className="edit-profile-input"></Box>
                </Box>
                <Box display={'flex'} flexDirection={'column'} rowGap={'.3rem'} width={'100%'}>
                    <Box component={'label'} className="edit-profile-label">Lastname</Box>
                    <Box component={'input'} type="text" defaultValue={userDetails.lastname} name="lastname" className="edit-profile-input"></Box>
                </Box>
            </Box>
            <Box display={'flex'} flexDirection={'column'} rowGap={'.3rem'}>
                <Box component={'label'} className="edit-profile-label">Description</Box>
                <Box component={'textarea'} type="text" defaultValue={userDetails.description} placeholder="Insert your description here.." rows={3} className="edit-profile-input edit-profile-txt"></Box>
            </Box>
            <Box display={'flex'} flexDirection={'column'} rowGap={'.3rem'} width={'100%'}>
                <Box component={'label'} className="edit-profile-label">Link or Website</Box>
                <Box component={'input'} type="text" defaultValue={userDetails.lastname} name="lastname" className="edit-profile-input"></Box>
            </Box>
            <Box className="save-profile-btn" component={'button'} display={'block'}>
                Confirm changes
            </Box>
        </Box>
    </Box>

  )
}

export default EditProfilePopUp