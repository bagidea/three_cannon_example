import {
    MutableRefObject,
    useEffect,
    useRef
} from "react"

import { SimpleOptimization } from "../src/components/simple_optimization"

const Index = () => {
    const canvas: MutableRefObject<HTMLCanvasElement> = useRef(null)

    useEffect(() => {
        const modelTestCanvas: SimpleOptimization = new SimpleOptimization(canvas.current)
        modelTestCanvas.init()
        modelTestCanvas.createScene()
        modelTestCanvas.postEffect()
        modelTestCanvas.render()
    })

    return (
        <canvas ref={ canvas } />
    )
}

export default Index