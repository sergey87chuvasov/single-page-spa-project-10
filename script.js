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