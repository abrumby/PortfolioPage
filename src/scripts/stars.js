import * as THREE from "three";
import world from '../scripts/world'



function generateStars() {
    let starsArray = []
    getStars(-1000, 0, starsArray);
    getStars(105, 1000, starsArray);
    return starsArray
}

function getStars(zMin, zMax, starsArray) {
    for (let z = zMin; z < zMax; z++) {
        let geometry = new THREE.SphereGeometry(0.5, 32, 32);
        let material = new THREE.MeshBasicMaterial({
            color: world.colors.slate,
        });
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = Math.random() * 1000 - 500;
        sphere.position.y = Math.random() * 1000 - 500;
        sphere.position.z = z;
        sphere.scale.x = sphere.scale.y = 1;
        starsArray.push(sphere)
    }
}

export {generateStars}