import {
    ACESFilmicToneMapping,
    //DirectionalLight,
    Mesh,
    MeshPhysicalMaterial,
    //PCFSoftShadowMap,
    PerspectiveCamera,
    PlaneGeometry,
    PMREMGenerator,
    Scene,
    UnsignedByteType,
    Vector3,
    WebGLRenderer,
    WebGLRenderTarget
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { BuildingGenerator } from './building_generator'

interface WindowSize {
    w: number,
    h: number
}

export class CityOptimizeCanvas {
    private canvas: HTMLElement
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera
    private controls: OrbitControls
    private rgbeLoader: RGBELoader

    private win: WindowSize

    constructor(canvas: HTMLElement) {
        this.canvas = canvas
        this.win = {
            w: window.innerWidth,
            h: window.innerHeight
        }
    }

    init() {
        this.scene = new Scene()

        this.camera = new PerspectiveCamera(
            60,
            this.win.w / this.win.h,
            0.01,
            1000.0
        )
        this.camera.position.set(45, 2, 50)
        this.camera.lookAt(45, 0, 45)

        this.renderer = new WebGLRenderer({
            antialias: true,
            canvas: this.canvas
        })
        this.renderer.setSize(this.win.w, this.win.h)
        this.renderer.toneMapping = ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 0.5
        //this.renderer.shadowMap.enabled = true
        //this.renderer.shadowMap.type = PCFSoftShadowMap
        this.renderer.setAnimationLoop(this.render)

        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.target = new Vector3(45, 0, 45)
        window.addEventListener('resize', this.windowResize)

        this.importTools()
    }

    importTools() {
        this.rgbeLoader = new RGBELoader()
        this.rgbeLoader.setDataType(UnsignedByteType)
    }

    windowResize = () => {
        this.win = {
            w: window.innerWidth,
            h: window.innerHeight
        }

        this.camera.aspect = this.win.w / this.win.h
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.win.w, this.win.h)
    }

    createScene() {
        const floor: Mesh = new Mesh(
            new PlaneGeometry(
                100,
                100
            ),
            new MeshPhysicalMaterial({
                color: 0x555555,
                roughness: 0.45,
                metalness: 0.5
            })
        )
        floor.rotation.x = -Math.PI / 2
        floor.position.x = 45
        floor.position.z = 45
        //floor.receiveShadow = true
        this.scene.add(floor)

        const building: BuildingGenerator = new BuildingGenerator(300)
        //building.mesh.castShadow = true
        this.scene.add(building.mesh)

        let pmrem: PMREMGenerator = new PMREMGenerator(this.renderer)
        pmrem.compileCubemapShader()

        this.rgbeLoader.load('/assets/env.hdr', i => {
            const envMap: WebGLRenderTarget = pmrem.fromEquirectangular(i)
            i.dispose()
            pmrem.dispose()
            this.scene.environment = envMap.texture
        })

        /*const dirLight: DirectionalLight = new DirectionalLight(0xffaaaa, 5)
        dirLight.position.set(50, 10, 50)
        dirLight.castShadow = true
        this.scene.add(dirLight)*/
    }

    render = () => {
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
}