const soundButton = document.getElementById('sound-button');
const soundIcon = document.getElementById('sound-icon');
const sound = document.getElementById('sound');

let isMuted = true; 


soundIcon.classList.remove('fa-volume-high');
soundIcon.classList.add('fa-volume-xmark');

sound.addEventListener('canplaythrough', () => {
  console.log('Áudio carregado e pronto para reprodução.');
});

soundButton.addEventListener('click', () => {
  if (isMuted) {
    sound.play().catch(error => {
      console.log('Não foi possível reproduzir o áudio. Erro:', error);
    });
    soundIcon.classList.remove('fa-volume-xmark');
    soundIcon.classList.add('fa-volume-high');
    isMuted = false;
  } else {
    sound.pause();
    soundIcon.classList.remove('fa-volume-high');
    soundIcon.classList.add('fa-volume-xmark');
    isMuted = true;
  }
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 200; 

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

renderer.setClearColor(0xffffff);

const geometry = new THREE.BoxGeometry(20, 20, 20); 


const materials = [];
const numRows = 30; 
const numCols = 16; 
const numDepth = 1; 
const spacing = 22; 

for (let i = 0; i < numRows * numCols * numDepth; i++) {
    materials.push(new THREE.MeshBasicMaterial({ color: new THREE.Color().setHSL(Math.random(), 0.5, 0.7) }));
}

const cubes = [];
const heightLimit = Math.floor(numCols / 3); 
for (let x = 0; x < numRows; x++) {
    for (let y = 0; y < numCols; y++) {
        if (y >= heightLimit) { 
            const material = materials[x * numCols + y];
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(
                (x - numRows / 2) * spacing,
                (y - numCols / 2) * spacing,
                0
            );
            cubes.push(cube);
            scene.add(cube);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });


    materials.forEach(material => {
        const color = new THREE.Color();
        color.setHSL((Date.now() % 10000) / 10000, 0.5, 0.7);
        material.color.set(color);
    });

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const cardContainer = document.querySelector('.card-container');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    cardContainer.style.transform = `translateX(${scrollPosition}px)`;
});

