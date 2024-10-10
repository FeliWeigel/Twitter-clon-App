import { Box } from '@mui/material'
import "../../css/btns.css"

// eslint-disable-next-line react/prop-types
const FollowingBtn = ({prop}) => {
  return (
    <Box component={'button'} className={`following-btn ${prop}`}>Following</Box>
  )
}

export default FollowingBtn