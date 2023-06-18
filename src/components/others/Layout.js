// styles

// components / pages / images

// tools
import { Box } from '@mui/material'

const Layout = ({children}) => {
  return (
    <Box 
      paddingLeft={["30px", "150px"]}
      paddingRight={["30px", "150px"]}
      paddingTop={["60px", "50px"]}
      paddingBottom={["60px", "50px"]}>
        {children}
    </Box>
  )
}

export default Layout