import {
    MutableRefObject,
    useEffect,
    useRef
} from 'react'

import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    BoxGeometry,
    MeshPhysicalMaterial,
    //InstancedMesh,
    Matrix4,
    Vector3,
    Euler,
    Quaternion,
    AmbientLight,
    TextureLoader,
    Clock,
    Texture,
    //DynamicDrawUsage
} from 'three'

import { InstancedUniformsMesh } from 'three-instanced-uniforms-mesh'
import { Flex } from '@chakra-ui/react'

interface Transform {
    position: Vector3,
    rotation: Euler,
    scale: Vector3
}

class WebGLContent {
    private canvas: HTMLCanvasElement
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera

    private meshList: Transform[]
    //private instancingMesh: InstancedMesh
    private instancingMesh: InstancedUniformsMesh
    private matrix4: Matrix4

    private texLoader: TextureLoader
    private texs: Texture[] = []

    private clock: Clock

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas

        this.init()
        this.createScene()
        this.createLight()
        this.render()
    }

    init() {
        const w: number = window.innerWidth
        const h: number = window.innerHeight
        const aspect: number = w/h

        this.matrix4 = new Matrix4()
        this.clock = new Clock()

        this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true })
        this.renderer.setSize(w, h)

        this.scene = new Scene()

        this.camera = new PerspectiveCamera(60, aspect, 1, 1000)
        this.camera.position.set(0, 2, 5)
        this.camera.lookAt(0, 0, 0)
    }

    genMatrix(position: Vector3, rotation: Euler, scale: Vector3): Matrix4 {
        const quaternion: Quaternion = new Quaternion()
        quaternion.setFromEuler(rotation)

        this.matrix4.compose(position, quaternion, scale)

        return this.matrix4
    }

    createScene() {
        this.texLoader = new TextureLoader()
        this.texs.push(this.texLoader.load("/images/box.jpg"))
        this.texs.push(this.texLoader.load("/images/box_iron.jpg"))

        const geometry: BoxGeometry = new BoxGeometry(1, 1, 1)
        const material: MeshPhysicalMaterial = new MeshPhysicalMaterial({ color: 0xffffff, map: this.texs[0] })
        material.onBeforeCompile = (v) => console.log(v)

        this.meshList = [
            {
                position: new Vector3(-1, 0, 0),
                rotation: new Euler(0, 0, 0),
                scale: new Vector3(1, 1, 1)
            },
            {
                position: new Vector3(1, 0, 0),
                rotation: new Euler(0, 0, 0),
                scale: new Vector3(1, 1, 1)
            }
        ]

        this.instancingMesh = new InstancedUniformsMesh(geometry, material, 2)
        //this.instancingMesh.instanceMatrix.setUsage(DynamicDrawUsage)

        this.meshList.forEach((v: Transform, i: number) => {
            this.instancingMesh.setMatrixAt(i, this.genMatrix(v.position, v.rotation, v.scale))
            this.instancingMesh.setUniformAt('map', i, this.texs[i])
        })

        this.scene.add(this.instancingMesh)
    }

    createLight() {
        this.scene.add(new AmbientLight(0xffffff, 1))
    }

    render = () => {
        requestAnimationFrame(this.render)

        const delta: number = this.clock.getDelta()

        for(let i: number = 0; i < this.meshList.length; i++) {
            const v: Transform = this.meshList[i]
            v.rotation.x += (0.5 + (i * 1)) * delta
            v.rotation.y += (0.5 + (i * 1)) * delta
            v.rotation.z += (0.5 + (i * 1)) * delta

            this.instancingMesh.setMatrixAt(i, this.genMatrix(v.position, v.rotation, v.scale))
            this.instancingMesh.instanceMatrix.needsUpdate = true
        }

        this.renderer.render(this.scene, this.camera)
    }
}

const InstancingPhysicalMaterial = () => {
    const canvas: MutableRefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        new WebGLContent(canvas.current)
   }, [])

    return (
        <Flex
            w="100vw"
            h="100vh"
        >
            <canvas ref={ canvas } />
        </Flex>
    )
}

export default InstancingPhysicalMaterial