'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.getElementById('section--1')
const image = document.querySelector('.header__img')
let activeButton = document.querySelector('.operations__tab--active')
let activeContent = document.querySelector('.operations__content--active')
const tabs = document.querySelectorAll('.operations__tab')
const tabContainer = document.querySelector('.operations__tab-container')
const tabContent = document.querySelectorAll('.operations__content')
const navLinks = document.querySelectorAll('.nav__link')
const nav = document.querySelector('.nav')

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btnOpen => {
  btnOpen.addEventListener('click', openModal)
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', () => {
  // const aScroll = document.createElement('a')
  // aScroll.setAttribute('href', `#${section1.id}`)  
  // aScroll.click()
  // const s1coords = section1.getBoundingClientRect()
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })
  section1.scrollIntoView({ behavior: 'smooth' })
})

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault()
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})


tabContainer.addEventListener('click', (e) => {
  e.preventDefault()
  const clicked = e.target.closest('.operations__tab')
  if (clicked) {
    const index = clicked.getAttribute('data-tab') - 1

    activeButton.classList.remove('operations__tab--active')
    tabs[index].classList.add('operations__tab--active')
    activeButton = tabs[index]

    activeContent.classList.remove('operations__content--active')
    tabContent[index].classList.add('operations__content--active')
    activeContent = tabContent[index]

  }
})

const setOpacity = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this
    })
    logo.style.opacity = this
  }
}

nav.addEventListener('mousemove', setOpacity.bind(0.5))

nav.addEventListener('mouseout', setOpacity.bind(1))

// navLinks.forEach(function (nav) {
//   nav.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//   })
// })

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

// document.querySelector('.nav__link')
//   .addEventListener('click', function () {
//     this.style.backgroundColor = randomColor();
//   })

// document.querySelector('.nav__links')
//   .addEventListener('click', function () {
//     this.style.backgroundColor = randomColor();
//   })
