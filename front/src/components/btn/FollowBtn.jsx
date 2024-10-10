/* eslint-disable react/prop-types */
import { Box } from '@mui/material'
import "../../css/btns.css"

const FollowBtn = ({prop}) => {
  return (
    <Box component={'button'} className={`follow-btn ${prop}`}>Follow</Box>
  )
}

export default FollowBtn