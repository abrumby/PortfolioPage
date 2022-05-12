import * as dat from "dat.gui";
import world from "./world";
import generatePlane from "./plane"

function addDatGui(){
    const gui = new dat.GUI();
    const planeFolder = gui.addFolder('Plane Size')
    const segmentFolder = gui.addFolder('Segment Size')
    const colorFolder = gui.addFolder('Color')

    planeFolder.add(world.plane.size, 'width', 1, innerWidth).onChange(() => {
        generatePlane()
    })
    planeFolder.add(world.plane.size, 'height', 1, innerHeight).onChange(() => {
        generatePlane()
    })
    segmentFolder.add(world.plane.segments, 'width', 1, 100).onChange(() => {
        generatePlane()
    })
    segmentFolder.add(world.plane.segments, 'height', 1, 100).onChange(() => {
        generatePlane()
    })
    colorFolder.add(world.plane.color, 'r', 0.01, 1).onChange(() => {
    })
    colorFolder.add(world.plane.color, 'g', 0.01, 1).onChange(() => {
    })
    colorFolder.add(world.plane.color, 'b', 0.01, 1).onChange(() => {
    })
}

export default addDatGui