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

function flipCard(card) {
    const innerCard = card.querySelector('.card-inner');
    innerCard.style.transform = innerCard.style.transform === 'rotateY(180deg)' ? '' : 'rotateY(180deg)';
}

function showModal(event, card) {
  // Captura os dados da carta
  const title = card.getAttribute('data-title');
  const image = card.getAttribute('data-image');
  const description = card.getAttribute('data-description');

  // Atualiza o modal com os dados da carta
  document.getElementById('modal-title').textContent = title;

  // Verifica se o título é "METAMORFOSE" ou "Sonhos e Delírios" e decide sobre a imagem
  const modalImage = document.getElementById('modal-image');
  if (title === "METAMORFOSE" || title === "Sonhos e Delírios" || title === "Vou Embora Pra Bahia" || title === "Meditação" || title === "Próximos Projetos") {
      modalImage.style.display = 'none'; // Oculta a imagem
  } else {
      modalImage.src = image; // Atualiza a imagem
      modalImage.style.display = 'block'; // Exibe a imagem
  }

  // Atualiza a descrição do modal usando innerHTML para renderizar <br>
  document.getElementById('modal-description').innerHTML = description;

  // Exibe o modal
  document.getElementById('dynamic-modal').classList.add('active');
  document.getElementById('modal-overlay').classList.add('active');
}


function closeModal() {
  document.getElementById('dynamic-modal').classList.remove('active');
  document.getElementById('modal-overlay').classList.remove('active');
}

