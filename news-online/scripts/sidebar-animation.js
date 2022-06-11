'use strict'


const menuBar = document.querySelector('.menu-bar')
const sideBar = document.getElementById('sidebar')
const overLay = document.querySelector('.over-lay')

const showSidebar = () => {
    sideBar.classList.add('active')
    overLay.classList.remove('hidden')
}

const closeSidebar = () => {
    sideBar.classList.remove('active')
    overLay.classList.add('hidden')
}


menuBar.addEventListener('click', showSidebar)

overLay.addEventListener('click', closeSidebar)