import {
    MutableRefObject,
    useEffect,
    useRef
} from "react"
import { ModelTestCanvas } from "../src/components/model_test_canvas"

const Index = () => {
    const canvas: MutableRefObject<HTMLCanvasElement> = useRef(null)

    useEffect(() => {
        const modelTestCanvas: ModelTestCanvas = new ModelTestCanvas(canvas.current)
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