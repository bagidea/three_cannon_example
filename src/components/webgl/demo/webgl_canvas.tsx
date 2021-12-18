import {
    BoxGeometry,
    Mesh,
    MeshPhysicalMaterial as Material,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    WebGLRenderer,
    ACESFilmicToneMapping,
    UnsignedByteType,
    PMREMGenerator,
    WebGLRenderTarget,
    DirectionalLight,
    PCFSoftShadowMap,
    FogExp2,
    SphereGeometry,
    Color,
    Vector2,
    Vector3,
    Clock
} from 'three'

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

import {
    Body,
    Box,
    NaiveBroadphase,
    Plane,
    Sphere,
    Vec3,
    World
} from 'cannon'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface boxObject {
    body: Body,
    mesh: Mesh
}

export class DemoCanvas {
    canvas: HTMLElement
    width: number
    height: number
    near: number
    far: number

    renderer: WebGLRenderer
    scene: Scene
    camera: PerspectiveCamera
    controls: OrbitControls
    clock: Clock

    effectComposer: EffectComposer
    renderPass: RenderPass
    fxaaPass: ShaderPass
    bloomPass: UnrealBloomPass
    bokehPass: BokehPass

    boxGeometry: BoxGeometry
    boxMaterial: Material[] = []
    rgbeLoader: RGBELoader

    world: World
    dt: number = 1.0/60.0
    damping: number = 0.01

    objs: boxObject[] = []
    m: number = 0
    ballLightBody: Body
    ballLight: Mesh

    constructor(
            canvas: HTMLElement,
            width: number = window.innerWidth,
            height: number = window.innerHeight,
            near: number = 0.1,
            far: number = 100
        ) {
        this.canvas = canvas
        this.width = width
        this.height = height
        this.near = near
        this.far = far
    }

    windowResize = () => {
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.camera.aspect = this.width/this.height
        this.camera.updateProjectionMatrix()

        this.effectComposer.setSize(this.width, this.height)
        let ratio: number = this.renderer.getPixelRatio()
        this.fxaaPass.material.uniforms['resolution'].value.x = 1/(this.width*ratio)
        this.fxaaPass.material.uniforms['resolution'].value.y = 1/(this.height*ratio)

        this.renderer.setSize(this.width, this.height)
    }

    run() {
        this.init()
        this.importTools()
        this.initCannon()
        this.createScene()
        this.render()

        window.addEventListener('resize', this.windowResize)
    }

    init() {
        // Renderer
        this.renderer = new WebGLRenderer({ antialias: true, canvas: this.canvas })
        this.renderer.setSize(this.width, this.height)
        this.renderer.toneMapping = ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 0.1
        this.renderer.shadowMap.type = PCFSoftShadowMap
        this.renderer.shadowMap.enabled = true

        // Scene
        this.scene = new Scene()
        this.scene.fog = new FogExp2(0x000000, 0.03)

        // Camera
        this.camera = new PerspectiveCamera(60, this.width/this.height, this.near, this.far)
        this.camera.position.set(0, 2, 5)
        this.camera.lookAt(0, 1, 0)

        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.target = new Vector3(0, 1, 0)
        this.controls.enablePan = false
        this.controls.minDistance = 3
        this.controls.maxDistance = 7
        this.controls.maxPolarAngle = Math.PI/2.5

        this.clock = new Clock()
    }

    importTools() {
        this.rgbeLoader = new RGBELoader()
        this.rgbeLoader.setDataType(UnsignedByteType)

        this.effectComposer = new EffectComposer(this.renderer)
        this.effectComposer.setSize(this.width, this.height)

        this.renderPass = new RenderPass(this.scene, this.camera)

        this.fxaaPass = new ShaderPass(FXAAShader)
        let ratio: number = this.renderer.getPixelRatio()
        this.fxaaPass.material.uniforms['resolution'].value.x = 1/(this.width*ratio)
        this.fxaaPass.material.uniforms['resolution'].value.y = 1/(this.height*ratio)

        this.bloomPass = new UnrealBloomPass(new Vector2(this.width, this.height), 2, 0.25, 0.7)

        this.bokehPass = new BokehPass(this.scene, this.camera, {
            focus: 5,
            aperture: 0.0005,
            maxblur: 0.01,
            width: this.width,
            height: this.height
        })

        this.effectComposer.addPass(this.renderPass)
        this.effectComposer.addPass(this.fxaaPass)
        this.effectComposer.addPass(this.bloomPass)
        this.effectComposer.addPass(this.bokehPass)
    }

    initCannon() {
        this.world = new World()
        this.world.broadphase = new NaiveBroadphase()
        this.world.gravity.set(0, -10, 0)

        const groundBody: Body = new Body({ mass: 0 })
        groundBody.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), -Math.PI/2)
        const groundShape: Plane = new Plane()
        groundBody.addShape(groundShape)
        this.world.addBody(groundBody)

        const ballLightShape: Sphere = new Sphere(0.5)
        this.ballLightBody = new Body({ mass: 0 })
        this.ballLightBody.addShape(ballLightShape)
        this.ballLightBody.position.set(0, 1, 0)
        this.world.addBody(this.ballLightBody)
    }

    addBox(x: number, y: number, z: number): boxObject {
        const size: number = Math.random()*0.5+0.2
        const sizeH: number = size/2

        const boxShape: Box = new Box(new Vec3(sizeH, sizeH, sizeH))
        const boxBody = new Body({ mass: 1 })
        boxBody.position.set(x, y, z)
        boxBody.quaternion.setFromEuler(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI)
        boxBody.linearDamping = this.damping
        boxBody.addShape(boxShape)
        this.world.addBody(boxBody)

        const boxMesh = new Mesh(
            this.boxGeometry,
            this.boxMaterial[Math.floor(Math.random()*this.boxMaterial.length)]
        )
        boxMesh.castShadow = true
        //boxMesh.receiveShadow = true
        boxMesh.scale.set(size, size, size)

        boxMesh.position.set(
            boxBody.position.x,
            boxBody.position.y,
            boxBody.position.z
        )
        boxMesh.quaternion.set(
            boxBody.quaternion.x,
            boxBody.quaternion.y,
            boxBody.quaternion.z,
            boxBody.quaternion.w
        )

        this.scene.add(boxMesh)
        
        return { body: boxBody, mesh: boxMesh }
    }

    createScene() {
        const floor = new Mesh(
            new PlaneGeometry(100, 100),
            new Material({
                color: 0xffaa00,
                roughness: 0.4,
                metalness: 0.2
            })
        )
        floor.receiveShadow = true
        floor.rotation.x = -Math.PI/2
        this.scene.add(floor)

        this.ballLight = new Mesh(
            new SphereGeometry(0.5, 16, 32),
            new Material({
                color: 0xffffff,
                emissive: new Color(0xffffff),
                emissiveIntensity: 50
            })
        )
        this.ballLight.position.set(
            this.ballLightBody.position.x,
            this.ballLightBody.position.y,
            this.ballLightBody.position.z
        )
        this.scene.add(this.ballLight)

        this.boxGeometry = new BoxGeometry(1, 1, 1)
        this.boxMaterial.push(new Material({
            color: 0x0055ff,
            roughness: 0.1
        }))
        this.boxMaterial.push(new Material({
            color: 0xff5500,
            roughness: 0.1
        }))
        this.boxMaterial.push(new Material({
            color: 0x00ff55,
            roughness: 0.1
        }))
        this.boxMaterial.push(new Material({
            color: 0xffffff,
            roughness: 0.1,
            metalness: 1
        }))

        for(let i: number = 0; i < 300; i++)
            this.objs.push(this.addBox(Math.floor(Math.random()*4-2), 5+i*3, Math.floor(Math.random()*4-2)))

        let pmrem: PMREMGenerator = new PMREMGenerator(this.renderer)
        pmrem.compileCubemapShader()

        this.rgbeLoader.load('/assets/env.hdr', i => {
            const envMap: WebGLRenderTarget = pmrem.fromEquirectangular(i)
            i.dispose()
            pmrem.dispose()
            this.scene.environment = envMap.texture
        })

        const dirLight: DirectionalLight = new DirectionalLight(0xffffff, 0.5)
        dirLight.castShadow = true
        dirLight.position.set(0, 10, 0)

        dirLight.shadow.mapSize.width = 256
        dirLight.shadow.mapSize.height = 256
        dirLight.shadow.camera.near = 0.1
        dirLight.shadow.camera.far = 20

        this.scene.add(dirLight)
    }

    render = () => {
        requestAnimationFrame(this.render)
        this.controls.update()
        this.world.step(this.dt)
        const t: number = this.clock.getDelta()

        this.ballLightBody.position.x = Math.cos(this.m)*2
        this.ballLightBody.position.y = Math.cos(this.m/3)*1.5+2
        this.ballLightBody.position.z = Math.sin(this.m)*2
        this.m += t*5

        this.ballLight.position.set(
            this.ballLightBody.position.x,
            this.ballLightBody.position.y,
            this.ballLightBody.position.z
        )

        for(let i: number = 0; i < this.objs.length; i++) {
            this.objs[i].mesh.position.set(
                this.objs[i].body.position.x,
                this.objs[i].body.position.y,
                this.objs[i].body.position.z
            )

            this.objs[i].mesh.quaternion.set(
                this.objs[i].body.quaternion.x,
                this.objs[i].body.quaternion.y,
                this.objs[i].body.quaternion.z,
                this.objs[i].body.quaternion.w
            )
        }

        this.renderer.render(this.scene, this.camera)
        this.effectComposer.render()
    }
}