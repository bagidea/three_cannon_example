import {
    MutableRefObject,
    useEffect,
    useRef
} from "react"

const Minecraft = () => {
    const canvas: MutableRefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
    }, [])

    return (
        <canvas ref={ canvas } />
    )
}

export default Minecraft