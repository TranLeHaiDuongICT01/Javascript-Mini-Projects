'use strict';

let breedList = [];
const key = "breeds";
// Select DOM
const form = document.getElementById('form-breed')
const input = document.getElementById('input-breed')
const type = document.getElementById('input-type')
const tbody = document.getElementById('tbody')
const toggleSidebar = document.getElementById('sidebar-title')
// Functions
const deleteBreed = (id) => {
    if (window.confirm('Are you sure to delete this breed')) {
        breedList = breedList.filter(breed => breed?.id !== id);
        saveToStorage(key, breedList);
        renderTable(breedList);
    }
}

const clearInput = () => {
    input.value = '';
    type.value = 'Select Type'
}

const submitForm = (e) => {
    e.preventDefault()
    const breedName = input.value;
    const breedType = type.value;
    if (breedName === '')
        return alert('Please fill in breed name')
    if (breedType === 'Select Type')
        return alert('Please choose a type')
    if (breedList.some(breed => breed.name === breedName && breed.type === breedType))
        return alert('Breed already exists.')
    const data = {
        id: breedList.length + 1,
        name: breedName,
        type: breedType
    }
    breedList.push(data)
    saveToStorage(key, breedList)
    renderTable(breedList)
    clearInput()
}

const renderTable = (breedList) => {
    tbody.innerHTML = '';
    breedList?.forEach((breed, i) => {
        // Create table row
        const tr = document.createElement('tr')

        // Create table cell of id
        const tdId = document.createElement('td')
        tdId.innerHTML = breed?.id
        tr.appendChild(tdId)

        // Create table cell of breed name
        const tdBreed = document.createElement('td');
        tdBreed.innerHTML = breed?.name;
        tr.appendChild(tdBreed)

        // Create table cell of breed type
        const tdType = document.createElement('td')
        tdType.innerHTML = breed?.type
        tr.appendChild(tdType)

        // Create table cell of button delete
        const tdBtn = document.createElement('td');
        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = 'Delete';
        btnDelete.type = 'button';
        btnDelete.classList.add('btn', 'btn-danger');
        btnDelete.addEventListener('click', () => {
            deleteBreed(breedList[i].id);
        })
        tdBtn.appendChild(btnDelete);
        tr.appendChild(tdBtn);

        tbody.appendChild(tr);
    })
}
// End functions


// Add event
form.addEventListener('submit', submitForm)
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('active')
})
// End add event


// Call function

// Get data from localstorage, If there is no breed data stored, create default breed list like below
breedList = getFromStorage(key) || [
    {
        id: 1,
        name: "Husky",
        type: "Dog"
    },
    {
        id: 2,
        name: "Persian",
        type: "Cat"
    }
];
saveToStorage(key, breedList)

renderTable(breedList)

// End call function