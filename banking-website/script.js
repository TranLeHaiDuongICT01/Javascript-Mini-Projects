'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.getElementById('section--1')
const section2 = document.getElementById('section--2');
const image = document.querySelector('.header__img')
let activeButton = document.querySelector('.operations__tab--active')
let activeContent = document.querySelector('.operations__content--active')
const tabs = document.querySelectorAll('.operations__tab')
const tabContainer = document.querySelector('.operations__tab-container')
const tabContent = document.querySelectorAll('.operations__content')
const navLinks = document.querySelectorAll('.nav__link')
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
const allSection = document.querySelectorAll('.section')
const imageLazy = document.querySelectorAll('img[data-src]')
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const slider = document.querySelector('.slider')
const dots = document.querySelector('.dots')

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

// const initialCoors = section1.getBoundingClientRect()
// window.addEventListener('scroll', (e) => {
//   if(window.scrollY > initialCoors.top) {
//     nav.classList.add('sticky')
//   } else nav.classList.remove('sticky')
// })

// const obCallback = function (entries, observer) {
//   entries.forEach(en => {
//     console.log(en);
//   })
// }

// const observeOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }

// const observer = new IntersectionObserver(obCallback, observeOptions)
// observer.observe(section1)
const navHeight = nav.getBoundingClientRect().height
const stickNav = function (entries) {
  const [entry] = entries
  if (!entry.isIntersecting) {
    nav.classList.add('sticky')
  } else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(
  stickNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
}
)
headerObserver.observe(header)


nav.addEventListener('mousemove', setOpacity.bind(0.5))

nav.addEventListener('mouseout', setOpacity.bind(1))


// Reveal sections
const revealSection = (entries, observer) => {
  const [entry] = entries
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(
  revealSection, {
  root: null,
  threshold: 0.1
}
)

allSection.forEach(section => {
  sectionObserver.observe(section)
  // section.classList.add('section--hidden')
})


// Lazy loading images
const lazyLoad = (entries, observer) => {
  const [entry] = entries
  if (!entry.isIntersecting) return
  console.log(entry);
  entry.target.src = entry.target.dataset.src
  entry.target.classList.remove('lazy-img')
  entry.target.addEventListener('load', function () {

  })
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(
  lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
}
)

imageLazy.forEach(image => {
  imgObserver.observe(image)

})



// slider

let currentSlide = 0
slides.forEach((slide, i) => {
  slide.style.transform = `translate(${i * 100}%)`
})


const prevSlide = () => {
  currentSlide--;
  if (currentSlide === -1) currentSlide = slides.length - 1
  slides.forEach((slide, i) => {
    slide.style.transform = `translate(${(i - currentSlide) * 100}%)`
  })
}

const nextSlide = () => {
  currentSlide++;
  if (currentSlide === slides.length) currentSlide = 0
  slides.forEach((slide, i) => {
    slide.style.transform = `translate(${(i - currentSlide) * 100}%)`
  })
}

btnRight.addEventListener('click', nextSlide)

btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')
    prevSlide()
  else if(e.key === 'ArrowRight') nextSlide()
})


