import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    PMREMGenerator,
    DataTexture,
    Group,
    Mesh,
    BoxGeometry,
    MeshPhysicalMaterial,
    PlaneGeometry,
    TextureLoader,
    Texture,
    RepeatWrapping,
    MathUtils,
    DirectionalLight,
    PointLight,
    HemisphereLight,
    PCFSoftShadowMap,
    ACESFilmicToneMapping,
    Vector2,
    Vector3,
    FogExp2,
    Clock
} from 'three'

import {
    GLTFLoader,
    GLTF
} from 'three/examples/jsm/loaders/GLTFLoader'

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Water } from 'three/examples/jsm/objects/Water'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass'
//import { GammaCorrectionShader} from 'three/examples/jsm/shaders/GammaCorrectionShader'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
//import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'

export class ModelTestCanvas {
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera
    private canvas: HTMLCanvasElement

    private width: number
    private height: number

    private rgbeLoader: RGBELoader
    private gltfLoader: GLTFLoader
    private textureLoader: TextureLoader

    private controls: OrbitControls

    private water: Water

    private composor: EffectComposer
    //private renderPass: RenderPass
    private ssrPass: SSRPass
    private bloomPass: UnrealBloomPass
    private fxaaPass: ShaderPass
    private bokehPass: BokehPass

    private clock: Clock
    private move: number

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas

        this.width = window.innerWidth
        this.height = window.innerHeight

        this.clock = new Clock()
        this.move = 0
    }

    windowResize = () => {
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(
            this.width,
            this.height
        )
    }

    init() {
        this.renderer = new WebGLRenderer({
            antialias: true,
            canvas: this.canvas
        })

        this.renderer.toneMapping = ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 0.3

        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = PCFSoftShadowMap

        this.renderer.setSize(
            this.width,
            this.height
        )

        this.scene = new Scene()
        this.scene.fog = new FogExp2(0x000000, 0.01)

        this.camera = new PerspectiveCamera(
            60,
            this.width / this.height,
            0.1,
            100
        )

        this.camera.position.set(0, 5, 8)
        this.camera.lookAt(0, 1, 0)

        window.addEventListener('resize', this.windowResize)

        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.target = new Vector3(0, 1, 0)
        this.controls.enablePan = false
        //this.controls.enableZoom = false
        this.controls.minDistance = 6
        this.controls.maxDistance = 12
        this.controls.maxPolarAngle = MathUtils.degToRad(90)
    }

    createScene() {
        this.rgbeLoader = new RGBELoader()
        this.gltfLoader = new GLTFLoader()
        this.textureLoader = new TextureLoader()

        const pmrem = new PMREMGenerator(this.renderer)
        pmrem.compileEquirectangularShader()

        this.rgbeLoader.load('/assets/env_night.hdr', (v: DataTexture) => {
            const env = pmrem.fromEquirectangular(v)

            v.dispose()
            pmrem.dispose()

            this.scene.environment = env.texture
            this.scene.background = env.texture
        })

        // Material

        const baseMaterial: MeshPhysicalMaterial = new MeshPhysicalMaterial({
            color: 0x873d2a,
            roughness: 0.2
        })

        const whiteMaterial: MeshPhysicalMaterial = new MeshPhysicalMaterial({
            color: 0xffffff
        })

        const waterMaterial: MeshPhysicalMaterial = new MeshPhysicalMaterial({
            color: 0x066f9c,
            roughness: 0
        })

        const boatMaterial: MeshPhysicalMaterial = new MeshPhysicalMaterial({
            color: 0x783116,
            roughness: 0
        })

        const logoMaterial: MeshPhysicalMaterial = new MeshPhysicalMaterial({
            color: 0x477589,
            metalness: 0.8,
            roughness: 0
        })

        const redMaterial: MeshPhysicalMaterial = new MeshPhysicalMaterial({
            color: 0xff0000,
            roughness: 0.3
        })

        const grayMaterial: MeshPhysicalMaterial = new MeshPhysicalMaterial({
            color: 0x666688,
            roughness: 0.3
        })

        const textMaterial: MeshPhysicalMaterial = new MeshPhysicalMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 7
        })

        this.gltfLoader.load('/assets/shop_fishing.glb', (v: GLTF) => {
            const model: Group = v.scene

            model.traverse((a: any) => {
                if(a.isMesh) {
                    const mesh: Mesh = a as Mesh
                    mesh.castShadow = true

                    // 0  Text
                    // 1  Stick fish
                    // 2  Logo
                    // 3  Water
                    // 4  Body
                    // 5  not sure - Body
                    // 6  Black
                    // 7  Body
                    // 8  Orange
                    // 9  Boat
                    // 10 Flag stick
                    // 11 Flag
                    // 12 Flag white
                    // 13 Stick fish big
                    // 14 Fish mouth
                    // 15 Fish body

                    switch(a.name) {
                        case "Mesh":
                            //mesh.material = textMaterial
                            mesh.material = whiteMaterial
                            break
                        case "Mesh_1":
                            mesh.material = whiteMaterial
                            break
                        case "Mesh_2":
                            mesh.material = logoMaterial
                            break
                        case "Mesh_3":
                            mesh.material = waterMaterial
                            break
                        case "Mesh_4":
                            mesh.material = baseMaterial
                            break
                        case "Mesh_5":
                            mesh.material = baseMaterial
                            break
                        case "Mesh_6":
                            //mesh.material = baseMaterial
                            break
                        case "Mesh_7":
                            mesh.material = baseMaterial
                            break
                        case "Mesh_8":
                            mesh.material = redMaterial
                            break
                        case "Mesh_9":
                            mesh.material = boatMaterial
                            break
                        case "Mesh_10":
                            mesh.material = grayMaterial
                            break
                        case "Mesh_11":
                            mesh.material = redMaterial
                            break
                        case "Mesh_12":
                            mesh.material = whiteMaterial
                            break
                        case "Mesh_13":
                            mesh.material = whiteMaterial
                            break
                        case "Mesh_14":
                            mesh.material = whiteMaterial
                            break
                        case "Mesh_15":
                            mesh.material = grayMaterial
                            break
                    }
                }
            })

            this.scene.add(model)
        })

        const floor: Mesh = new Mesh(
            new BoxGeometry(5, 1, 5),
            new MeshPhysicalMaterial({
                color: 0xffffff,
                roughness: 0.5,
                map: this.textureLoader.load('/assets/diffuse.jpg'),
                normalMap: this.textureLoader.load('/assets/normal.jpg'),
                aoMap: this.textureLoader.load('/assets/ao.jpg'),
                roughnessMap: this.textureLoader.load('/assets/roughness.jpg')
            })
        )

        floor.receiveShadow = true
        floor.position.set(0, -0.51, 0)
        this.scene.add(floor)

        const sun: DirectionalLight = new DirectionalLight(0xffffff, 5)
        sun.castShadow = true
        sun.position.set(5, 10, 5)
        this.scene.add(sun)

        const p1: PointLight = new PointLight(0xff0000, 2)
        p1.castShadow = true
        p1.position.set(-3, 2, -1)
        this.scene.add(p1)

        const p2: PointLight = new PointLight(0x0000ff, 2)
        p2.castShadow = true
        p2.position.set(3, 2, 3)
        this.scene.add(p2)

        const hemishereLight: HemisphereLight = new HemisphereLight(0xffffff, 0x222255, 1)
        this.scene.add(hemishereLight)

        this.water = new Water(
            new PlaneGeometry(1000, 1000),
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: this.textureLoader.load('/assets/waternormals.jpg', (v: Texture) => {
                    v.wrapS = v.wrapT = RepeatWrapping
                }),
                sunDirection: sun.position,
                sunColor: 0x555555,
                waterColor: 0x55aaff,
                distortionScale: 3.7,
                fog: this.scene.fog !== undefined
            }
        )

        this.water.rotation.x = MathUtils.degToRad(-90)
        this.water.position.y = -0.5
        this.water.material.uniforms['size'].value = 0.5
        this.scene.add(this.water)
    }

    postEffect() {
        this.composor = new EffectComposer(this.renderer)

        /*this.renderPass = new RenderPass(
            this.scene,
            this.camera
        )*/

        this.ssrPass = new SSRPass({
            renderer: this.renderer,
            scene: this.scene,
            camera: this.camera,
            width: this.width,
            height: this.height,
            groundReflector: null,
            selects: null
        })

        this.bloomPass = new UnrealBloomPass(
            new Vector2(
                2048,
                2048
            ),
            0.3,
            0.3,
            0.7
        )

        this.fxaaPass = new ShaderPass(FXAAShader)
        const ratio: number = this.renderer.getPixelRatio()
        this.fxaaPass.material.uniforms['resolution'].value.x = 1 / (this.width / ratio)
        this.fxaaPass.material.uniforms['resolution'].value.y = 1 / (this.height / ratio)

        this.bokehPass = new BokehPass(
            this.scene,
            this.camera,
            {
                focus: 8,
                aperture: 0.0005,
                maxblur: 0.005,
                width: this.width,
                height: this.height
            }
        )

        //this.composor.addPass(this.renderPass)
        this.composor.addPass(this.ssrPass)
        this.composor.addPass(this.fxaaPass)
        this.composor.addPass(this.bloomPass)
        this.composor.addPass(this.bokehPass)
        //this.composor.addPass(new ShaderPass(GammaCorrectionShader))
    }

    render = () => {
        requestAnimationFrame(this.render)

        const tmr: number = this.clock.getDelta()

        this.water.material.uniforms['time'].value += 0.2 * tmr
        //this.water.position.y = Math.sin(this.move) * 0.2
        //this.move += tmr

        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        this.composor.render()
    }
}