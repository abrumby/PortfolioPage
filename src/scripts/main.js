import '../styles/main.css'
import * as THREE from 'three'
import * as PLANE from "./plane";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import addDatGui from "./datGui";
import world from "./world";
import { generateStars } from "./stars";

const rayCaster = new THREE.Raycaster()
const scene = new THREE.Scene()
const aspectRatio = innerWidth / innerHeight
const renderer = new THREE.WebGLRenderer()
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 150
const frontLight = new THREE.DirectionalLight(
    world.colors.white, 1
)
const ambientLight1 = new THREE.AmbientLight(world.colors.amber, 0.2)
const ambientLight2 = new THREE.AmbientLight(world.colors.red, 0.2)
const backLight = new THREE.DirectionalLight(
    world.colors.white, 1
)


PLANE.generatePlane()
//addDatGui()

frontLight.position.set(0, 1, 1)
backLight.position.set(0, 0, -1)

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

generateStars().forEach(s => scene.add(s))


scene.add(PLANE.planeMesh)
scene.add(frontLight)
scene.add(backLight)
scene.add(ambientLight1)
scene.add(ambientLight2)

camera.position.z = 100
controls.update();

function animate() {
    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene, camera)
    rayCaster.setFromCamera(world.mouse, camera)
    PLANE.animatePlane(rayCaster)
}
animate()
addEventListeners()

function addEventListeners() {
    addEventListener('mousemove', (event) => {
        world.mouse.x = (event.clientX / innerWidth) * 2 - 1
        world.mouse.y = -(event.clientY / innerHeight) * 2 + 1
    })
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
