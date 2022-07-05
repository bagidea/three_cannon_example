import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class MinecraftExample {
    private canvas: HTMLCanvasElement
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera

    private w: number
    private h: number

    private controls: OrbitControls

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
        this.camera.position.set(0, 2, 5)
        this.camera.lookAt(0, 0, 0)

        this.controls = new OrbitControls(this.camera, this.canvas)

        window.addEventListener('resize', this.windowResize)
    }

    create() {
        const boxGeometry: BoxGeometry = new BoxGeometry(1, 1, 1)
        const boxMaterial: MeshBasicMaterial = new MeshBasicMaterial({ color: 0xffffff })
        const box: Mesh = new Mesh(boxGeometry, boxMaterial)

        this.scene.add(box)
    }

    render = () => {
        requestAnimationFrame(this.render)

        this.renderer.render(this.scene, this.camera)
    }
}