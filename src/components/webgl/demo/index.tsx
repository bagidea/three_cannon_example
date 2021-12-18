import { MutableRefObject, useRef } from 'react'
import { Flex } from "@chakra-ui/react"
import { useEffect } from "react"
import { DemoCanvas } from "./webgl_canvas"

const Demo = () => {
    const canvas: MutableRefObject<HTMLCanvasElement> = useRef(null)

    useEffect(() => {
        const demo: DemoCanvas = new DemoCanvas(canvas.current)
        demo.run()
    }, [])

    return (
        <Flex>
            <canvas id='webgl_canvas' ref={ canvas } />
        </Flex>
    )
}

export default Demo