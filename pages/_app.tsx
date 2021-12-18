import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import store from "../src/redux/store";

const _App = ({ Component, pageProps }) => (
    <Provider store={ store }>
        <ChakraProvider>
            <AnimatePresence>
                <Component { ...pageProps } />
            </AnimatePresence>
        </ChakraProvider>
    </Provider>
)

export default _App