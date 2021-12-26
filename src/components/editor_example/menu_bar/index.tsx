import {
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuGroup,
    HStack,
    Image,
    Spacer,
    Text,
    Avatar,
    MenuOptionGroup,
    MenuItemOption
} from '@chakra-ui/react'

import {
    MenuBarStyle,
    MenuItemStyle,
    MenuListStyle
} from '../../../chakraTheme'

import {
    RiLandscapeLine
} from 'react-icons/ri'

import { menuDatas } from './menu_datas'

const MenuBar = () => {
    return (
        <Flex
            w="100vw"
            h={ 55 }
            px={ 3 }
            bgGradient="linear(to-b, primary.600, primary.900)"
            alignItems="center"
            boxShadow="0px 5px black"
        >
            <HStack spacing={ 1 } w="100%" maxW="550px" minW="300px">
                <Image
                    src="images/logo_ico_cute.png"
                    w="40px"
                    h="40px"
                    mr={ 2 }
                />
                {
                    menuDatas.map(v =>
                        <Menu
                            key={ v.name }
                            autoSelect={ false }
                            closeOnSelect={ v.name == "View" ? false : true }
                        >
                            <MenuButton
                                as={ Button }
                                leftIcon={ v.icon }
                                { ...MenuBarStyle }
                                w={ { base: "40px", xl: "100px" } }
                                pl={ { base: "25px", xl: "5px" } }
                                overflow="hidden"
                            ><Text display={ { base: 'none', xl: 'block' } }>{ v.name }</Text></MenuButton>
                            <MenuList
                                { ...MenuListStyle }
                                maxH="500px"
                                overflowY="auto"
                                css={
                                    {
                                        '&::-webkit-scrollbar': { width: '10px' },
                                        '&::-webkit-scrollbar-track': { width: '10px' },
                                        '&::-webkit-scrollbar-thumb': { background: "#252328", borderRadius: '24px' },
                                    }
                                }
                            >
                                {
                                    v.childs.map(a =>
                                        v.name != "View" ?
                                        <MenuGroup
                                            key={ a.title }
                                            title={ a.title }
                                        >
                                            {
                                                a.childs.map(c => 
                                                    <MenuItem
                                                        key={ c.name }
                                                        { ...MenuItemStyle }
                                                        command={ c.command }
                                                        icon={ c.icon }
                                                    >{ c.name }</MenuItem>
                                                )
                                            }
                                        </MenuGroup> :
                                        <MenuOptionGroup
                                            key={ a.title }
                                            title={ a.title }
                                            type='checkbox'
                                        >
                                            {
                                                a.childs.map(c => 
                                                    <MenuItemOption
                                                        key={ c.name }
                                                        { ...MenuItemStyle }
                                                        command={ c.command }
                                                        value={ c.id }
                                                    >{ c.name }</MenuItemOption>
                                                )
                                            }
                                        </MenuOptionGroup>
                                    )
                                }
                            </MenuList>
                        </Menu>
                    )
                }
            </HStack>

            <Spacer />

            <HStack
                spacing={ 3 }
                w="100%"
                minW="300px"
                fontSize="xl"
                color="primary.100"
                overscroll="auto"
                justifyContent="center"
            >
                <RiLandscapeLine />
                <Text>Test scene.json - BIS Editor</Text>
            </HStack>

            <Spacer />

            <HStack
                spacing={ 3 }
                w={ { base: "50%", lg: "100%" } }
                maxW="550px"
                fontSize="xl"
                color="primary.100"
                justifyContent="right"
                cursor="pointer"
            >
                <Avatar size="sm" />
                <Text display={ { base: 'none', lg: 'block' } }>Anonymous</Text>
            </HStack>
        </Flex>
    )
}

export default MenuBar