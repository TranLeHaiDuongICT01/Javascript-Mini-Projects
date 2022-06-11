'use strict'

const CURRENT_USER_KEY = 'CURRENT_USERS'
let currentUser = getFromStorage(CURRENT_USER_KEY) || {}


// Select DOM Element
const loginModal = document.getElementById('login-modal')
const mainContent = document.getElementById('main-content')
const welcomeMessage = document.getElementById('welcome-message')
const btnLogout = document.getElementById('btn-logout')
//



// Create Functions
function parseUser(userData) {
    const user = new User(userData.firstName, userData.lastName, userData.userName, userData.password)
    return user
}

const checkLogin = () => {
    currentUser = getFromStorage(CURRENT_USER_KEY) || {}
    if (currentUser.userName) {
        loginModal.style.display = 'none'
        mainContent.style.display = 'block'
        welcomeMessage.innerHTML = `Welcome ${currentUser.firstName}`
    } else {
        loginModal.style.display = 'block'
        mainContent.style.display = 'none'
    }
}

const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY)
    checkLogin()
}
//



// Handle Events
btnLogout.addEventListener('click', logout)
//



checkLogin()

