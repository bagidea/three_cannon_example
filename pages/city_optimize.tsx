import {
    MutableRefObject,
    useEffect,
    useRef
} from "react"

import { CityOptimizeCanvas } from "../src/components/webgl/city_optimize"

const CityOptimize = () => {
    const canvas: MutableRefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const webgl: CityOptimizeCanvas = new CityOptimizeCanvas(canvas.current)
        webgl.init()
        webgl.createScene()
    }, [])

    return (
        <canvas ref={ canvas } />
    )
}

export default CityOptimize