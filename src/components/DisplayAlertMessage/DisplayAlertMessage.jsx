import { Box } from '@chakra-ui/react'
import React from 'react'

const DisplayAlertMessage = props => {
  const { message } = props
  return (
    <Box borderRadius='lg' borderWidth='1px' overflow='hidden'>
      <Text p>{message}</Text>      
    </Box>
      
  )
}

export default DisplayAlertMessage
