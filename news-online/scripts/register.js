'use strict'

const USER_KEY = 'USERS'
let users = getFromStorage(USER_KEY) || []

// Select DOM Element
const registerForm = document.getElementById('register-form')
const inputFirstName = document.getElementById('input-firstname')
const inputLastName = document.getElementById('input-lastname')
const inputUserName = document.getElementById('input-username')
const inputPassword = document.getElementById('input-password')
const inputPasswordConfirm = document.getElementById('input-password-confirm')
//



// Create Functions
function parseUser(userData) {
    const user = new User(userData.firstName, userData.lastName, userData.userName, userData.password)
    return user
}

const clearForm = () => {
    inputFirstName.value = ''
    inputLastName.value = ''
    inputUserName.value = ''
    inputPassword.value = ''
    inputPasswordConfirm.value = ''
}

const validateInput = (firstName, lastName, userName, password, confirmPassword) => {
    if (firstName.trim().length === 0 || lastName.trim().length === 0 || userName.trim().length === 0 ||
        password.trim().length === 0 || confirmPassword.trim().length === 0) {
        alert('Fields cannot only contain space characters')
        return false
    }

    if (users.findIndex(user => user?.userName === userName) !== -1) {
        alert('Username already exists')
        return false
    }

    if (password !== confirmPassword) {
        alert('Password and confirm password must be the same')
        return false
    }

    if (password.length <= 8) {
        alert('Password must have more than 8 characters(at least 9 chars)')
        return false
    }
    return true
}

const submitHandle = (e) => {
    e.preventDefault()

    const firstName = inputFirstName.value
    const lastName = inputLastName.value
    const userName = inputUserName.value
    const password = inputPassword.value
    const confirmPassword = inputPasswordConfirm.value

    const isValid = validateInput(firstName, lastName, userName, password, confirmPassword)
    if (isValid) {
        const userData = {
            firstName, lastName, userName, password
        }
        users.push(userData)
        saveToStorage(USER_KEY, users)
        clearForm()
        window.location.href = '../pages/login.html'
    }
}
//



// Handle Events
registerForm.addEventListener('submit', submitHandle)
//




