'use strict'
const PAGE_SIZE_KEY = 'PageSize'
const CATEGORY_KEY = 'Category'
let pageSize = getFromStorage(PAGE_SIZE_KEY) || '10'
let category = getFromStorage(CATEGORY_KEY) || 'General'

// Select DOM
const inputPageSize = document.getElementById('input-page-size')
const inputCategory = document.getElementById('input-category')
const btnSave = document.getElementById('btn-submit')
const form = document.getElementById('form-setting')
//



// Create Functions
const validateInput = () => {
    if (inputPageSize.value === '') {
        alert('Page size must not be empty')
        return false
    }
    if (Number(inputPageSize.value) <= 0) {
        alert('Page size must greater than 0')
        return false
    }
    return true
}

const saveSettings = () => {
    pageSize = inputPageSize.value
    category = inputCategory.value

    saveToStorage(PAGE_SIZE_KEY, pageSize)
    saveToStorage(CATEGORY_KEY, category)
    alert('Save settings successfully')
}
//



// Handle Events
btnSave.addEventListener('click', () => {
    if (!validateInput()) return
    saveSettings()
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!validateInput()) return
    saveSettings()
})
//


inputPageSize.value = pageSize
inputCategory.value = category