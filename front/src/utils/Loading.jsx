/* eslint-disable react/prop-types */
import { ImSpinner2 } from "react-icons/im";
import "../index.css"
const Loading = ({size}) => {
  return (
    <>
        <ImSpinner2 size={size} className="loading-spinner"/>
    </>
  )
}

export default Loading