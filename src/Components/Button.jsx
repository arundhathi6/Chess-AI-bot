import { Box, Button, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'

const ButtonsGroup = ({ item, setQuery, handleQuery }) => {
    const handleClick = (item) => {
        setQuery(item)
        handleQuery(item)
    }
    return (
        <Box >
            <Wrap spacing={4} >
                <WrapItem>
                    <Button colorScheme={item.color} onClick={() => handleClick(item.name)}>{item.name}</Button>
                </WrapItem>
            </Wrap>
        </Box>
    )
}

export default ButtonsGroup