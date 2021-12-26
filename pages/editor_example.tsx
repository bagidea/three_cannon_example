import { Flex } from '@chakra-ui/react'
import MenuBar from '../src/components/editor_example/menu_bar'

const EditorExample = () => {
    return (
        <Flex
            h="100vh"
            overflow="hidden"
        >
            <MenuBar />
        </Flex>
    )
}

export default EditorExample