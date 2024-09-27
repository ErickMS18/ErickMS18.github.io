
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

const container = document.getElementById('three-container');
if (container) {
  container.appendChild(renderer.domElement);
} else {
  console.error("Elemento 'three-container' não encontrado!");
}

renderer.setClearColor(0xffffff);

const geometry = new THREE.BoxGeometry(20, 20, 20); 

const materials = [];
const numRows = 30; 
const numCols = 22; 
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


function openModal(num) {
    document.getElementById('modal' + num).style.display = 'flex';
}

function closeModal(num) {
    document.getElementById('modal' + num).style.display = 'none';
}

window.onclick = function(event) {
    for (let i = 1; i <= 5; i++) {
        const modal = document.getElementById('modal' + i);
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
};

document.getElementById('mainCircle').onclick = function() {
    const circles = document.querySelectorAll('.small-circle');
    const mainCircle = document.getElementById('mainCircle');
    mainCircle.style.display = 'none'; // Esconde o círculo principal
    circles.forEach((circle, index) => {
        setTimeout(() => {
            circle.style.display = 'flex';
            circle.style.transform = 'scale(1)'; 
            circle.style.opacity = '1'; 
        }, index * 300); 
    });
};

// Listas de imagens para cada modal
var modalImages = {
    1: [
        "../media/capa_monitoria.jpg",
        "../media/monitoria1.jpg",
        "../media/monitoria2.jpg",
        "../media/monitoria3.jpg",
        "../media/monitoria4.jpg"
    ],
    2: [
        "../media/ci1.jpg",
        "../media/ci2.jpg",
        "../media/ci3.jpg",
        "../media/ci4.jpg",
        "../media/ci5.png",
        "../media/ci6.jpg"
    ],
    3: [
        "../media/ps1.jpg",
        "../media/ps2.jpg",
        "../media/ps3.jpg",
        "../media/ps4.jpg",
        "../media/ps5.jpg"
    ],
    4: [
        "../media/od1.jpg",
        "../media/od2.jpg",
        "../media/od3.jpg",
        "../media/od4.jpg",
        "../media/od5.jpg",
        "../media/od6.jpg",
        "../media/od7.jpg",
        "../media/od8.jpg",
        "../media/od9.jpg"
    ],
    5: [
        "../media/amigos1.jpg",
        "../media/amigos2.jpg",
        "../media/amigos3.jpg",
        "../media/amigos4.jpg",
        "../media/amigos5.jpg"
    ]
};

var currentImageIndex = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}; // Índice da imagem atual para cada modal

// Função para mudar as imagens automaticamente
function changeImage(modalId) {
    // Atualizar o índice da imagem para o modal específico
    currentImageIndex[modalId]++;

    // Garantir que o índice esteja dentro dos limites da lista de imagens
    if (currentImageIndex[modalId] >= modalImages[modalId].length) {
        currentImageIndex[modalId] = 0; // Volta para a primeira imagem
    }

    // Atualizar o src da imagem no modal
    document.getElementById("modal-image" + modalId).src = modalImages[modalId][currentImageIndex[modalId]];
}

// Mudar a imagem a cada 3 segundos (3000 ms)
setInterval(function() {
    for (var i = 1; i <= 5; i++) {
        if (document.getElementById('modal' + i).style.display === 'flex') {
            changeImage(i);
        }
    }
}, 3000);

// Função para abrir o modal e iniciar a troca de imagens
function openModal(id) {
    document.getElementById('modal' + id).style.display = 'flex';
    // Iniciar a troca de imagens quando o modal for aberto
    changeImage(id);
}

// Função para fechar o modal
function closeModal(id) {
    document.getElementById('modal' + id).style.display = 'none';
}
