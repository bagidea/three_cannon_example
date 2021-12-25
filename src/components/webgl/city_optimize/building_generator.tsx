import {
    BoxBufferGeometry,
    Euler,
    InstancedMesh,
    Matrix4,
    MeshPhysicalMaterial,
    Quaternion,
    Vector3
} from "three";

export class BuildingGenerator {
    matrix: Matrix4
    geometry: BoxBufferGeometry
    material: MeshPhysicalMaterial
    mesh: InstancedMesh

    num: number

    constructor(num) {
        this.matrix = new Matrix4()
        this.geometry = new BoxBufferGeometry(0.1, 0.1, 0.1)
        this.material = new MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.1
        })

        this.num = num
        this.mesh = new InstancedMesh(this.geometry, this.material, num*num)

        let index: number = 0

        for(let i: number = 0; i < this.num; i++)
            for(let a: number = 0; a < this.num; a++)
                this.createBuilding(index++, i, a)
    }

    createBuilding(inx: number, i: number, a: number) {
        const position: Vector3 = new Vector3()
        const rotation: Euler = new Euler()
        const quaternion: Quaternion = new Quaternion()
        const scale: Vector3 = new Vector3()

        const randScale: number = Math.random() * 10

        position.x = i * 0.3
        position.y = 0.05 + ( (randScale * 0.1)/2 ) 
        position.z = a * 0.3

        rotation.x = 0
        rotation.y = 0
        rotation.z = 0
        quaternion.setFromEuler(rotation)

        scale.x = scale.z = 1
        scale.y = randScale + 1

        this.matrix.compose(position, quaternion, scale)
        this.mesh.setMatrixAt(inx, this.matrix)
    }
}