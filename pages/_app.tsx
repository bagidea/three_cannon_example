import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import { theme } from "../src/chakraTheme";
import store from "../src/redux/store";

const _App = ({ Component, pageProps }) => (
    <Provider store={ store }>
        <ChakraProvider theme={ theme }>
            <AnimatePresence>
                <Component { ...pageProps } />
            </AnimatePresence>
        </ChakraProvider>
    </Provider>
)

export default _App