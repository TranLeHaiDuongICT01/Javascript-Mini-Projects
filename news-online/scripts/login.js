'use strict'

const USER_KEY = 'USERS'
const CURRENT_USER_KEY = 'CURRENT_USERS'
let users = getFromStorage(USER_KEY) || []

// Select DOM Element
const registerForm = document.getElementById('register-form')
const inputUserName = document.getElementById('input-username')
const inputPassword = document.getElementById('input-password')
//



// Create Functions
function parseUser(userData) {
    const user = new User(userData.firstName, userData.lastName, userData.userName, userData.password)
    return user
}

const clearForm = () => {
    inputUserName.value = ''
    inputPassword.value = ''
}

const validateInput = (userName, password) => {
    if (userName.trim().length === 0 || password.trim().length === 0) {
        alert('Fields cannot only contain space characters')
        return null
    }
    const user = users.find(user => user?.userName === userName)
    if (!user) {
        alert('Username not found')
        return null
    }

    if (user.password !== password) {
        alert('Wrong password')
        return null
    }

    return user
}

const submitHandle = (e) => {
    e.preventDefault()

    const userName = inputUserName.value
    const password = inputPassword.value

    const isValid = validateInput(userName, password)
    if (isValid) {
        saveToStorage(CURRENT_USER_KEY, isValid)
        clearForm()
        window.location.href = '../index.html'
    }
}
//



// Handle Events
registerForm.addEventListener('submit', submitHandle)
//




