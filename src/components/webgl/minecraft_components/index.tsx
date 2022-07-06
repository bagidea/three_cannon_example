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
import Stats from 'three/examples/jsm/libs/stats.module'

export class MinecraftExample {
    private canvas: HTMLCanvasElement
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera

    private w: number
    private h: number

    private controls: OrbitControls
    private stats: Stats

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
        this.camera.position.set(64, 10, 130)
        this.camera.lookAt(64, 0, 64)

        //this.camera.position.set(0, 2, 5)
        //this.camera.lookAt(0, 0, 0)

        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.target = new Vector3(64, 0, 64)
        this.controls.update()

        this.stats = Stats()
        document.body.append(this.stats.dom)

        window.addEventListener('resize', this.windowResize)
    }

    create() {
        const boxGeometry: BoxGeometry = new BoxGeometry(1, 1, 1)
        const boxMaterial: MeshBasicMaterial = new MeshBasicMaterial({ color: 0x00ff00 })

        //const box: Mesh = new Mesh(boxGeometry, boxMaterial)
        //this.scene.add(box)

        /*const boxMaterials: MeshBasicMaterial[] = [
            new MeshBasicMaterial({ color: 0xff0000 }),
            new MeshBasicMaterial({ color: 0x00ff00 }),
            new MeshBasicMaterial({ color: 0x0000ff }),
            new MeshBasicMaterial({ color: 0xffff00 }),
            new MeshBasicMaterial({ color: 0x00ffff }),
            new MeshBasicMaterial({ color: 0xffffff })
        ]

        const box: Mesh = new Mesh(boxGeometry, boxMaterials)
        this.scene.add(box)*/

        const edgesGeometry: EdgesGeometry = new EdgesGeometry(boxGeometry)
        const edgesMaterial: LineBasicMaterial = new LineBasicMaterial({ color: 0x000000 })

        //const line: LineSegments = new LineSegments(edgesGeometry, edgesMaterial)
        //this.scene.add(line)

        const noise: ImprovedNoise = new ImprovedNoise()

        let xoff: number = 0
        let zoff: number = 0
        const inc: number = 0.03
        const amplitute: number = 20

        for(let i: number = 0; i < 128; i++) {
            //xoff = 0

            for(let a: number = 0; a < 128; a++) {
                xoff = inc * i
                zoff = inc * a
                const y: number = Math.round(noise.noise(xoff, zoff, 0) * amplitute)

                const box: Mesh = new Mesh(boxGeometry, boxMaterial)
                /*const box: Mesh = new Mesh(boxGeometry, [
                    null,
                    null,
                    boxMaterial,
                    null,
                    null,
                    null
                ])*/
                box.position.set(i, y, a)
                this.scene.add(box)

                const line: LineSegments = new LineSegments(edgesGeometry, edgesMaterial)
                line.position.copy(box.position)
                this.scene.add(line)

                //xoff += inc
            }

            //zoff += inc
        }
    }

    render = () => {
        requestAnimationFrame(this.render)
        this.stats.update()

        this.renderer.render(this.scene, this.camera)
    }
}