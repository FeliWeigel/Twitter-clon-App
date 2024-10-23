/* eslint-disable react/prop-types */
import { Box } from "@mui/material"
import "../../index.css"
import "../../css/btns.css"
import { FaFeatherAlt } from "react-icons/fa";

const NewPostBtn = ({prop}) => {
  return (
    <Box component={'button'} className={`new-post-btn ${prop}`}> <FaFeatherAlt size={23} color="#fff"/></Box>
  )
}

export default NewPostBtn