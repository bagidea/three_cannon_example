import {
    BoxGeometry,
    EdgesGeometry,
    LineBasicMaterial,
    LineSegments,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise'

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

        this.camera = new PerspectiveCamera(60, this.w/this.h, 0.1, 1000)
        this.camera.position.set(16, 10, 40)
        this.camera.lookAt(16, 0, 16)

        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.target = new Vector3(16, 0, 16)
        this.controls.update()

        window.addEventListener('resize', this.windowResize)
    }

    create() {
        const boxGeometry: BoxGeometry = new BoxGeometry(1, 1, 1)
        const boxMaterial: MeshBasicMaterial = new MeshBasicMaterial({ color: 0x00ff00 })

        //const box: Mesh = new Mesh(boxGeometry, boxMaterial)
        //this.scene.add(box)

        const edgesGeometry: EdgesGeometry = new EdgesGeometry(boxGeometry)
        const edgesMaterial: LineBasicMaterial = new LineBasicMaterial({ color: 0x000000 })

        //const line: LineSegments = new LineSegments(edgesGeometry, edgesMaterial)
        //this.scene.add(line)

        const noise: ImprovedNoise = new ImprovedNoise()

        let xoff: number = 0
        let zoff: number = 0
        const inc: number = 0.05
        const amplitute: number = 10

        for(let i: number = 0; i < 32; i++) {
            xoff = 0

            for(let a: number = 0; a < 32; a++) {
                const y: number = Math.round(noise.noise(xoff, zoff, 0) * amplitute)

                const box: Mesh = new Mesh(boxGeometry, boxMaterial)
                box.position.set(i, y, a)
                this.scene.add(box)

                const line: LineSegments = new LineSegments(edgesGeometry, edgesMaterial)
                line.position.copy(box.position)
                this.scene.add(line)

                xoff += inc
            }

            zoff += inc
        }
    }

    render = () => {
        requestAnimationFrame(this.render)

        this.renderer.render(this.scene, this.camera)
    }
}