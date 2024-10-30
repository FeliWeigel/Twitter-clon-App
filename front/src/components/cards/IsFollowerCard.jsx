import { Typography } from "@mui/material"

const IsFollowerCard = () => {
  return (
    <Typography 
        typography={'p'}
        sx={{
            color: "#05131C",
            width: '61px',
            marginBottom: '.2rem',
            letterSpacing: '0px',
            textAlign: 'center',
            background: 'rgba(255,255,255, .2)',
            fontSize: '.65rem',
            fontWeight: '500',
            borderRadius: '3px'
        }}
    >
        Follows you
    </Typography>
  )
}

export default IsFollowerCard