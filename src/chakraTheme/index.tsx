import { extendTheme } from '@chakra-ui/react'

const colors = {
    primary: {
        900: '#222222',
        700: '#333333',
        600: '#444444',
        500: '#555555',
        200: '#aaaaaa',
        100: '#dddddd'
    }
}

export const theme = extendTheme({
    colors
})

export const MenuBarStyle = {
    transition: "all 0.2s",
    border: "2px",
    borderColor: "primary.900",
    color: "white",
    bgColor: "primary.900",
    _hover: {
        bgColor: "primary.500"
    },
    _expanded: {
        borderColor: "primary.700",
        color: "primary.900",
        bgColor: "primary.200"
    },
    _focus: {
            boxShadow:"inner"
    }
}

export const MenuListStyle = {
    borderBlock: "2px",
    borderColor: "primary.900",
    color: "primary.100",
    bgColor: "primary.500"
}

export const MenuItemStyle = {
    color: "primary.100",
    _hover: {
        color: "primary.900"
    }
}