import {
    MutableRefObject,
    useEffect,
    useRef
} from 'react'

import { MinecraftExample } from '../src/components/webgl/minecraft_components'

const Minecraft = () => {
    const canvas: MutableRefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const game: MinecraftExample = new MinecraftExample(canvas.current)
        game.init()
        game.render()
    }, [])

    return (
        <canvas ref={ canvas } />
    )
}

export default Minecraft