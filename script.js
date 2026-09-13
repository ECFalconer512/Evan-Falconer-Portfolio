const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });
});

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const previousButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const status = carousel.querySelector('[data-carousel-status]');
  let currentSlide = 0;
  let touchStartX = 0;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    status.textContent = `${currentSlide + 1} / ${slides.length}`;
    slides.forEach((slide, slideIndex) => {
      slide.setAttribute('aria-hidden', String(slideIndex !== currentSlide));
    });
  };

  previousButton.addEventListener('click', () => showSlide(currentSlide - 1));
  nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

  carousel.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) showSlide(currentSlide + (distance < 0 ? 1 : -1));
  }, { passive: true });

  showSlide(0);
});

document.querySelectorAll('[data-discipline-carousel]').forEach((deck) => {
  const viewport = deck.querySelector('.discipline-viewport');
  const cards = Array.from(deck.querySelectorAll('.discipline-card'));
  const previousButton = deck.querySelector('[data-discipline-prev]');
  const nextButton = deck.querySelector('[data-discipline-next]');
  const status = deck.querySelector('[data-discipline-status]');
  let currentCard = 0;
  let pointerStartX = 0;
  let didDrag = false;
  let wheelReady = true;

  const updateStatus = (index) => {
    currentCard = index;
    status.textContent = `${currentCard + 1} / ${cards.length}`;
    cards.forEach((card, cardIndex) => {
      const relativePosition = (cardIndex - currentCard + cards.length) % cards.length;
      const positions = ['active', 'next', 'far', 'previous'];
      card.dataset.position = positions[relativePosition];
      card.setAttribute('aria-current', cardIndex === currentCard ? 'true' : 'false');
    });
  };

  const showCard = (index) => {
    const nextIndex = (index + cards.length) % cards.length;
    updateStatus(nextIndex);
  };

  previousButton.addEventListener('click', () => showCard(currentCard - 1));
  nextButton.addEventListener('click', () => showCard(currentCard + 1));

  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showCard(currentCard + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });

  viewport.addEventListener('pointerdown', (event) => {
    pointerStartX = event.clientX;
    didDrag = false;
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener('pointerup', (event) => {
    const distance = event.clientX - pointerStartX;
    if (Math.abs(distance) > 40) {
      didDrag = true;
      showCard(currentCard + (distance < 0 ? 1 : -1));
      window.setTimeout(() => { didDrag = false; }, 0);
    }
  });

  viewport.addEventListener('wheel', (event) => {
    if (wheelReady && Math.abs(event.deltaX) > Math.abs(event.deltaY) && Math.abs(event.deltaX) > 18) {
      event.preventDefault();
      wheelReady = false;
      showCard(currentCard + (event.deltaX > 0 ? 1 : -1));
      window.setTimeout(() => { wheelReady = true; }, 350);
    }
  }, { passive: false });

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (!didDrag) showCard(index);
    });
  });

  updateStatus(0);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('[data-year]').textContent = new Date().getFullYear();
