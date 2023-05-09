'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// skroll func
// console.log(window);
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScroll.addEventListener('click', () => {
  // 1 ver.
  // window.scrollTo({
  //   left: section1.getBoundingClientRect().left + window.pageXOffset,
  //   top: section1.getBoundingClientRect().top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  // 2 ver
  section1.scrollIntoView({behavior: 'smooth'});
})
// console.log(btnScroll.getBoundingClientRect());

/* 
// всплытие
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// console.log(randomInt(0,255)) ;

function randomColor() {
  return `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;
}

// console.log(randomColor());

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const link = document.querySelector('.nav__link');

nav.addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target);
  console.log(e.currentTarget);
  console.log(e.currentTarget === this)
})

navLinks.addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
})


link.addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  // остановить всплытие
  // e.stopPropagation()
})

*/

// delegation 1 ver.
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id)
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

// 2 ver - main
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();
  // console.log(e.target);
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
})

// tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function(e){
  e.preventDefault();
  const cliked = e.target.closest('.operations__tab'); // fixd span
  // console.log(cliked);

  if(!cliked) return
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
  cliked.classList.add('operations__tab--active');

  tabContent.forEach(content => content.classList.remove('operations__content--active'))
  // console.log(cliked.dataset.tab);
  document.querySelector(`.operations__content--${cliked.dataset.tab}`).classList.add('operations__content--active');
  
})

// transparent menu
const nav = document.querySelector('.nav');

function hover(e, opacity) {
  // console.log(this)

  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('.nav__logo');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    })
    logo.style.opacity = this;
  }

}

// nav.addEventListener('mouseover', function(e) {
//  hover(e, 0.5)
// })

// nav.addEventListener('mouseout', function(e) {
//   hover(e, 1)
// })

nav.addEventListener('mouseover', hover.bind(0.5));
nav.addEventListener('mouseout', hover.bind(1));

// intersection api

// old ver
/* 
const coord = section1.getBoundingClientRect()
window.addEventListener('scroll', function() {
  console.log(window.scrollY)

  if(window.scrollY > coord.top) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
})

*/

function callback(entries) {
  // console.log(entries[0])
  // console.log(observer)

  if(!entries[0].isIntersecting) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
}

const options = {
  root: null,
  threshold: 0, // 0 - 1
  rootMargin: '-50px',
}

const observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector('.header'));



// for all sections
const allSections = document.querySelectorAll('.section');

function revealSection(entries, observe) {
  // console.log(entries[0]);
  if(entries[0].isIntersecting) {
    entries[0].target.classList.remove('section--hidden');
    observe.unobserve(entries[0].target);
  }
}


const sectionsObserver = new IntersectionObserver(revealSection, 
  {
    threshold: 0.15
  });

allSections.forEach(function (section) {
  sectionsObserver.observe(section);
  section.classList.add('section--hidden');
})

// images - lazy load
const images = document.querySelectorAll('img[data-src]');
// console.log(images); // NodeList(3) 


function loading(entries, observer){
  // console.log(entries);
  if(!entries[0].isIntersecting) return;
  entries[0].target.src = entries[0].target.dataset.src;
  
  entries[0].target.addEventListener('load', function() {
    entries[0].target.classList.remove('lazy-img');
  })
  observer.unobserve(entries[0].target);
}

const imgObserver = new IntersectionObserver(loading, {thrashold: 0.15});

images.forEach(img => {
  imgObserver.observe(img)
})

// slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const dotsContainer = document.querySelector('.dots');

const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

let currSlide = 0;
const maxSlides = slides.length;

// slider.style.scale = 0.5;
// slider.style.overflow = 'visible';

// slides.forEach((slide, index) => {
//   slide.style.transform = `translateX(${100 * index}%)`;
// })

function goToSlide(slide) {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${100 * (index - slide)}%)`;
  })
}

goToSlide(0);

function nextSlide() {
  if (currSlide === maxSlides - 1) {
    currSlide = 0
  } else {
    currSlide++;
  }

  goToSlide(currSlide);
  activateDots(currSlide);
}

function prevSlide() {
  if(currSlide === 0) {
    currSlide = maxSlides - 1;
  } else {
    currSlide--;
  }

  goToSlide(currSlide);
  activateDots(currSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// slider + keyboard
document.addEventListener('keydown', function(e) {
  console.log(e)

  if(e.key === 'ArrowLeft') {
    prevSlide();
  }

  if(e.key === 'ArrowRight') {
    nextSlide();
  }
})

// slider dots
function createDots() {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML('beforeend', `
      <button class='dots__dot' data-slide=${i}></button>
    `)
  })
}

createDots();

dotsContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('dots__dot')){
    // console.log('dot')
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDots(slide);
  }
})

function activateDots(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove("dots__dot--active");
  })
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}

activateDots(0);