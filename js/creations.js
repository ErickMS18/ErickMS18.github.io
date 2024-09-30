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


