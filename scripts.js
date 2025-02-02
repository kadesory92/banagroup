// Fonction générique pour gérer un slider ou un carrousel
function setupSlider(sliderTrackSelector, prevButtonSelector, nextButtonSelector, autoSlideInterval = 5000) {
    const sliderTrack = document.querySelector(sliderTrackSelector);
    const slides = document.querySelectorAll(`${sliderTrackSelector} > *`);
    const prevButton = document.querySelector(prevButtonSelector);
    const nextButton = document.querySelector(nextButtonSelector);

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Fonction pour mettre à jour la position du slider
    function updateSlider() {
        const offset = -currentIndex * 100;
        sliderTrack.style.transform = `translateX(${offset}%)`;
    }

    // Fonction pour passer à la slide suivante
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    // Fonction pour passer à la slide précédente
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Défilement automatique
    let interval = setInterval(nextSlide, autoSlideInterval);

    // Gestion des clics sur les boutons
    nextButton.addEventListener('click', () => {
        clearInterval(interval);
        nextSlide();
        interval = setInterval(nextSlide, autoSlideInterval);
    });

    prevButton.addEventListener('click', () => {
        clearInterval(interval);
        prevSlide();
        interval = setInterval(nextSlide, autoSlideInterval);
    });

    // Arrêter le défilement automatique quand la souris est sur le slider
    sliderTrack.addEventListener('mouseenter', () => clearInterval(interval));
    sliderTrack.addEventListener('mouseleave', () => interval = setInterval(nextSlide, autoSlideInterval));
}

// Initialisation du slider du header
setupSlider('#slider-track', '#slider-prev', '#slider-next', 5000);

// Initialisation du carrousel des services
setupSlider('.carousel-track', '.carousel-prev', '.carousel-next', 5000);

// Animation des sections au scroll
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.75) {
            section.classList.add('visible');
        }
    });
});

// Sélection des éléments du carrousel de texte
const textCarousel = document.getElementById('text-carousel');
const textSlides = document.querySelectorAll('.text-slide');
let currentTextIndex = 0;

// Fonction pour afficher le texte suivant
function showNextText() {
    // Masquer le texte actuel
    textSlides[currentTextIndex].classList.remove('active');

    // Passer au texte suivant
    currentTextIndex = (currentTextIndex + 1) % textSlides.length;

    // Afficher le nouveau texte
    textSlides[currentTextIndex].classList.add('active');
}

// Afficher le premier texte au chargement de la page
textSlides[currentTextIndex].classList.add('active');

// Défilement automatique toutes les 3 secondes
setInterval(showNextText, 3000);

// Pour mobile
const menuButton = document.querySelector('button');
const navLinks = document.querySelector('ul');

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
});

// Fonction pour gérer la redirection au clic sur un service
function handleServiceClick(event) {
    const serviceBlock = event.currentTarget;
    const link = serviceBlock.getAttribute('data-link');
    if (link) {
        window.location.href = link;
    }
}

// Fonction pour ajouter les écouteurs d'événements aux blocs de services
function addEventListenersToServices() {
    const serviceBlocks = document.querySelectorAll('#services-container > div');
    serviceBlocks.forEach(block => {
        block.addEventListener('click', handleServiceClick);
    });
}

// Appeler la fonction pour ajouter les écouteurs d'événements
addEventListenersToServices();