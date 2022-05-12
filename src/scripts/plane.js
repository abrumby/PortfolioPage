import * as THREE from "three";
import world from '../scripts/world'
import gsap from "gsap";

const initialColor = {
    r: 0.19,
    g: 0.19,
    b: 0.40
}

let planeMesh = new THREE.Mesh()
let elapsedFrames = 0

function generatePlane() {
    const planeGeo = new THREE.PlaneGeometry(5, 5, 10, 10)
    const planeMaterial = new THREE.MeshPhongMaterial({
        color: world.colors.purple,
        side: THREE.DoubleSide,
        flatShading: THREE.FlatShading,
        vertexColors: true
    })
    planeMesh = new THREE.Mesh(
        planeGeo,
        planeMaterial
    )
    generatePlaneGeometry()
}

function generatePlaneGeometry() {
    planeMesh.geometry.dispose()

    planeMesh.geometry = new THREE.PlaneGeometry(
        world.plane.size.width,
        world.plane.size.height,
        world.plane.segments.width,
        world.plane.segments.height
    )
    setPlaneVerticesPositions();
    setPlaneVerticesColors();
}

function setPlaneVerticesPositions() {
    const {array} = planeMesh.geometry.attributes.position
    const randomValues = []
    for (let i = 0; i < array.length; i++) {
        if (i % 3 === 0) {
            let x = array[i]
            let y = array[i + 1]
            let z = array[i + 2]
            array[i] = x + (Math.random() - 0.5) * 5
            array[i + 1] = y + (Math.random() - 0.5) * 5
            array[i + 2] = z + (Math.random() - 0.5) * 5
        }
        randomValues.push(Math.random() * Math.PI * 2)
    }
    planeMesh.geometry.attributes.position.randomValues = randomValues
    planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array
}

function setPlaneVerticesColors() {
    const colors = []
    for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
        colors.push(initialColor.r, initialColor.g, initialColor.b)
    }
    planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))
}

function animatePlane(rayCaster) {
    elapsedFrames += 0.01
    const {array, originalPosition, randomValues} = planeMesh.geometry.attributes.position
    for (let i = 0; i < array.length; i += 3) {
        array[i] = originalPosition[i] + Math.cos(elapsedFrames + randomValues[i]) * 0.001
        array[i + 1] = originalPosition[i + 1] + Math.sin(elapsedFrames + randomValues[i + 1]) * 0.001
        array[i + 2] = originalPosition[i + 2] + Math.cos(elapsedFrames + randomValues[i + 2]) * 0.001
    }
    planeMesh.geometry.attributes.position.needsUpdate = true
    const intersects = rayCaster.intersectObject(planeMesh)
    if (intersects.length > 0) {
        const {color} = intersects[0].object.geometry.attributes

        const hoverColor = {
            r: initialColor.r * 2.5,
            g: initialColor.g * 2.5,
            b: initialColor.b * 2
        }
        gsap.to(hoverColor, {
            r: initialColor.r,
            g: initialColor.g,
            b: initialColor.b,
            duration: 0.2,
            onUpdate: () => {
                //1
                color.setX(intersects[0].face.a, hoverColor.r)
                color.setY(intersects[0].face.a, hoverColor.g)
                color.setZ(intersects[0].face.a, hoverColor.b)
                //2
                color.setX(intersects[0].face.b, hoverColor.r)
                color.setY(intersects[0].face.b, hoverColor.g)
                color.setZ(intersects[0].face.b, hoverColor.b)
                //3
                color.setX(intersects[0].face.c, hoverColor.r)
                color.setY(intersects[0].face.c, hoverColor.g)
                color.setZ(intersects[0].face.c, hoverColor.b)
                color.needsUpdate = true
            }
        })
    }
}

export default generatePlane
export {animatePlane, generatePlane, planeMesh}