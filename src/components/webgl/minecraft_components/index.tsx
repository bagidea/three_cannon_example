import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from 'three'

export class MinecraftExample {
    private canvas: HTMLCanvasElement
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera

    private w: number
    private h: number

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    windowResize = () => {
        this.w = window.innerWidth
        this.h = window.innerHeight

        this.camera.aspect = this.w/this.h
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.w, this.h)
    }

    init() {
        this.w = window.innerWidth
        this.h = window.innerHeight

        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })

        this.renderer.setSize(this.w, this.h)

        this.scene = new Scene()

        this.camera = new PerspectiveCamera(60, this.w/this.h, 1, 100)

        window.addEventListener('resize', this.windowResize)
    }

    render = () => {
        requestAnimationFrame(this.render)

        this.renderer.render(this.scene, this.camera)
    }
}