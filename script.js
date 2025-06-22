// --- Contador de Tempo ---
function startCountdown() {
    // Defina a data de início do relacionamento
    // Formato: Ano, Mês (0-11), Dia, Hora, Minuto, Segundo
    const startDate = new Date(2023, 2, 17, 10, 0, 0); // Exemplo: 15 de janeiro de 2024, 10:00:00

    const countdownElement = document.getElementById('countdown-timer');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = now - startDate.getTime();

        if (difference < 0) {
            countdownElement.innerHTML = "Ainda não começamos!";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div>${days}<span>dias</span></div>
            <div>${hours}<span>horas</span></div>
            <div>${minutes}<span>minutos</span></div>
            <div>${seconds}<span>segundos</span></div>
        `;
    }

    setInterval(updateCountdown, 1000); // Atualiza a cada segundo
    updateCountdown(); // Chama uma vez para exibir imediatamente
}


// --- Caixa de Música ---
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const albumArt = document.getElementById('album-art');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');

// Lista de músicas (coloque seus caminhos e informações aqui!)
const playlist = [
    {
        title: "Eis-me aqui",
        artist: "Vannessa Lopes",
        src: "music/Valesca_Mayssa_-_Eis-me_Aqui_CeeNaija.com_.mp3", // Exemplo: crie uma pasta 'music'
        cover: "maxresdefault.jpg" // Exemplo: crie uma pasta 'images' para capas
    },
    {
        title: "Sabe filho",
        artist: "Mara Lima",
        src: "music/03 Sabe Filho.mp3",
        cover: "images/cover2.jpg"
    },
    {
        title: "Grao de areia",
        artist: "Mara Lima",
        src: "music/06 Grão de areia.mp3 ",
        cover: "images/cover3.jpg"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;

function loadTrack(index) {
    const track = playlist[index];
    audioPlayer.src = track.src;
    albumArt.src = track.cover;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    audioPlayer.load(); // Carrega a nova faixa
}

function playPauseToggle() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.classList.remove('fa-pause');
        playPauseBtn.classList.add('fa-play');
    } else {
        audioPlayer.play();
        playPauseBtn.classList.remove('fa-play');
        playPauseBtn.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) { // Se estava tocando, continua tocando a próxima
        audioPlayer.play();
    } else { // Se estava pausado, apenas carrega a próxima
        playPauseBtn.classList.remove('fa-pause');
        playPauseBtn.classList.add('fa-play');
    }
}

function playPrevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    } else {
        playPauseBtn.classList.remove('fa-pause');
        playPauseBtn.classList.add('fa-play');
    }
}

// Event Listeners para a caixa de música
playPauseBtn.addEventListener('click', playPauseToggle);
nextBtn.addEventListener('click', playNextTrack);
prevBtn.addEventListener('click', playPrevTrack);
audioPlayer.addEventListener('ended', playNextTrack); // Toca a próxima quando a atual termina


// --- Pedido de Namoro ---
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const proposalSection = document.querySelector('.proposal-section'); // Pega a seção para usar nas coordenadas

function showAcceptanceMessage() {
    alert('q bom! docinho. esse aqui ta melhorizinho, ne? ❤️');
    // Você pode adicionar mais ações aqui, como redirecionar para outra página,
    // ou mudar o conteúdo da página para uma mensagem de celebração.
    yesBtn.style.display = 'none'; // Esconde o botão Sim
    noBtn.style.display = 'none'; // Esconde o botão Não
    document.querySelector('.proposal-paper h2').textContent = 'eu sei que ce gosta de mim,rapaz';
    document.querySelector('.proposal-paper h2').style.color = '#4CAF50';
    document.querySelector('.proposal-paper .paper-content').innerHTML += '<p style="font-family: \'Dancing Script\', cursive; font-size: 1.8em; text-align: center; margin-top: 20px;">Espero que goste e se diverta!!! queria fazer faz um tempinho. me desculpa, ta?</p>';
}

function moveNoButton() {
    const maxX = proposalSection.offsetWidth - noBtn.offsetWidth;
    const maxY = proposalSection.offsetHeight - noBtn.offsetHeight;

    // Garante que o botão se mova dentro da área visível da seção
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = 'absolute'; // Assegura que o botão pode ser posicionado livremente
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.classList.add('moving'); // Adiciona a classe para ativar a animação CSS
}

yesBtn.addEventListener('click', showAcceptanceMessage);

noBtn.addEventListener('mouseover', moveNoButton); // Move quando o mouse passa por cima
noBtn.addEventListener('touchstart', moveNoButton); // Move em toque para dispositivos móveis
noBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o clique de acontecer
    moveNoButton(); // Move o botão de novo caso tentem clicar rapidamente
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    loadTrack(currentTrackIndex); // Carrega a primeira música ao iniciar
});