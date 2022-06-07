'use strict';


let petList = [];
let breedList = [];
const petkey = 'pet'
const breedKey = 'breeds'
let checkHealthy = false;
// Select DOM element
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById('clear-btn')
const showBtn = document.getElementById('healthy-btn')
const calculateBMIBtn = document.getElementById('BMI-btn');
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const form = document.getElementById('form')
const tableBody = document.getElementById('tbody')
const sidebar = document.getElementById('sidebar')
const toggleSidebar = document.getElementById('sidebar-title')
// End Select DOM element

// Functions
const renderBreed = (breedList) => {
    breedInput.innerHTML = ''
    const tdSelect = document.createElement('option')
    tdSelect.innerHTML = 'Select Breed'
    breedInput.appendChild(tdSelect)
    breedList.filter((item, i, ar) => ar.findIndex(b => b?.name === item?.name) === i).forEach(breed => {
        const breedOption = document.createElement('option')
        breedOption.innerHTML = breed?.name;
        breedInput.appendChild(breedOption)
    })
}

const clearInput = () => {
    idInput.value = ''
    nameInput.value = ''
    ageInput.value = ''
    typeInput.value = 'Select Type'
    weightInput.value = ''
    lengthInput.value = ''
    colorInput.value = '#000000'
    breedInput.value = 'Select Breed'
    vaccinatedInput.checked = false
    dewormedInput.checked = false
    sterilizedInput.checked = false
}

const submitForm = (e) => {
    e.preventDefault();
    const id = idInput.value;
    const name = nameInput.value;
    const age = Number(ageInput.value);
    const type = typeInput.value;
    const weight = Number(weightInput.value);
    const length = Number(lengthInput.value);
    const breed = breedInput.value;
    const color = colorInput.value;
    const vaccinated = vaccinatedInput.checked;
    const dewormed = dewormedInput.checked;
    const sterilized = sterilizedInput.checked;

    const data = {
        id, name, age, type, weight, length, breed, color, vaccinated, dewormed, sterilized,
        date: new Date(), BMI: '?'
    }

    const validate = validateData(data)
    if (validate) {
        clearInput()
        petList.push(data)
        saveToStorage(petkey, petList);
        renderTableData(petList)
    } else {
        return
    }
}

const calculateBMI = () => {
    for (let i = 0; i < petList.length; i++) {
        let BMI;
        if (petList[i].type === 'Cat') {
            BMI = (petList[i].weight * 886) / petList[i].length ** 2;
        } else {
            BMI = (petList[i].weight * 703) / petList[i].length ** 2;
        }
        petList[i].BMI = Number(BMI.toFixed(2));
    }
    renderTableData(petList)
}

const showPet = () => {
    if (!checkHealthy) {
        showBtn.innerHTML = 'Show All';
        const healthyPetList = petList.filter(pet => pet.vaccinated && pet.dewormed && pet.sterilized);
        renderTableData(healthyPetList);
    } else {
        showBtn.innerHTML = 'Show Healthy Pet';
        renderTableData(petList);
    }
    checkHealthy = !checkHealthy;
}

const convertDate = (date) => {
    const convertDate = new Date(date);
    return ((convertDate.getMonth() > 8) ? (convertDate.getMonth() + 1) : ('0' + (convertDate.getMonth() + 1))) + '/' + ((convertDate.getDate() > 9) ? convertDate.getDate() : ('0' + convertDate.getDate())) + '/' + convertDate.getFullYear();
}

const validateData = ({ id, name, age, type, weight, length, breed }) => {
    const findPet = petList.filter((item) => item.id === id)

    if (id.trim() === '') {
        window.alert('Please input for id');
        return false;
    }

    if (name.trim() === '') {
        window.alert('Please input for name');
        return false;
    }

    if (findPet && findPet.length > 0) {
        window.alert('ID must be unique!');
        return false;
    }
    if (age < 1 || age > 15) {
        window.alert('Age must be between 1 and 15!');
        return false;
    }
    if (weight < 1 || weight > 15) {
        window.alert('Weight must be between 1 and 15!');
        return false;
    }
    if (length < 1 || length > 100) {
        window.alert('Length must be between 1 and 100!');
        return false;
    }
    if (type === 'Select Type') {
        window.alert('Please select type');
        return false;
    }
    if (breed === 'Select Breed') {
        window.alert('Please select Breed!');
        return false;
    }
    return true;
}

const renderTableData = (petList) => {
    tableBody.innerHTML = '';
    for (let i = 0; i < petList.length; i++) {
        const tr = document.createElement('tr')

        // Id
        const th = document.createElement('th')
        th.scope = 'row';
        th.innerHTML = petList[i].id;
        tr.appendChild(th);

        // Name
        const trName = document.createElement('td');
        trName.innerHTML = petList[i].name;
        tr.appendChild(trName);

        // Age
        const trAge = document.createElement('td');
        trAge.innerHTML = petList[i].age;
        tr.appendChild(trAge);

        // Type
        const trType = document.createElement('td');
        trType.innerHTML = petList[i].type;
        tr.appendChild(trType);

        // Weight
        const trWeight = document.createElement('td');
        trWeight.innerHTML = petList[i].weight;
        tr.appendChild(trWeight);

        // Length
        const trLength = document.createElement('td');
        trLength.innerHTML = petList[i].length;
        tr.appendChild(trLength);

        // Breed
        const trBreed = document.createElement('td');
        trBreed.innerHTML = petList[i].breed;
        tr.appendChild(trBreed);

        // Color
        const tColor = document.createElement('td');
        const iconColor = document.createElement('i');
        iconColor.classList.add('bi', 'bi-square-fill');
        iconColor.style.color = petList[i].color;
        tColor.appendChild(iconColor);
        tr.appendChild(tColor);

        // Vaccinated
        const tVaccinated = document.createElement('td');
        const iconVaccinated = document.createElement('i');
        iconVaccinated.classList.add('bi', `${petList[i].vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`);
        tVaccinated.appendChild(iconVaccinated);
        tr.appendChild(tVaccinated);

        // Dewormed
        const tDewormed = document.createElement('td');
        const iconDewormed = document.createElement('i');
        iconDewormed.classList.add('bi', `${petList[i].dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`);
        tDewormed.appendChild(iconDewormed);
        tr.appendChild(tDewormed);

        // Sterilized
        const tSterilized = document.createElement('td');
        const iconSterilized = document.createElement('i');
        iconSterilized.classList.add('bi', `${petList[i].sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`);
        tSterilized.appendChild(iconSterilized);
        tr.appendChild(tSterilized);

        //  BMI
        const tdBMI = document.createElement('td');
        tdBMI.innerHTML = petList[i].BMI;
        tr.appendChild(tdBMI);

        // Date
        const tdDate = document.createElement('td');
        tdDate.innerHTML = convertDate(petList[i].date);
        tr.appendChild(tdDate);

        // Button Delete
        const tdBtn = document.createElement('td');
        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = 'Delete';
        btnDelete.type = 'button';
        btnDelete.classList.add('btn', 'btn-danger');
        btnDelete.addEventListener('click', () => {
            deletePet(petList[i].id);
        })
        tdBtn.appendChild(btnDelete);

        // Button Edit
        const btnEdit = document.createElement('button')
        btnEdit.innerHTML = 'Edit'
        btnEdit.type = 'button';
        btnEdit.classList.add('btn', 'btn-warning');
        btnEdit.addEventListener('click', () => {

        })
        tdBtn.appendChild(btnEdit)

        tdBtn.style.display = 'flex'
        tdBtn.style.gap = '8px'

        tr.appendChild(tdBtn);

        tableBody.appendChild(tr)
    }
}

const deletePet = (id) => {
    if (window.confirm('Are you sure?')) {
        petList = petList.filter(item => item.id !== id);
        saveToStorage(petkey, petList);
        renderTableData(petList);
    }
}

const showAll = () => {
    renderTableData(petList);
}
// End functions


// Add Event
clearBtn.addEventListener('click', clearInput)

calculateBMIBtn.addEventListener('click', calculateBMI)

showBtn.addEventListener('click', showPet)

breedInput.addEventListener('change', () => {
    const breedName = breedInput.value
    if (breedName !== 'Select Breed') {
        const breedType = breedList.filter(breed => breed.name === breedName)
        if (breedType.length === 1) {
            const breedByType = breedList.filter(breed => breed?.type === breedType[0]?.type)
            renderBreed(breedByType);
            typeInput.value = breedType[0]?.type
            breedInput.value = breedName
        }
    }
})

typeInput.addEventListener('change', () => {
    const typeName = typeInput.value
    if (typeName !== 'Select Type') {
        const breedName = breedInput.value
        const breedType = breedList.filter(breed => breed.name === breedName)
        const breedByType = breedList.filter(breed => breed?.type === typeName)
        renderBreed(breedByType)
        if (breedType.findIndex(b => b.type === typeName) !== -1) {
            breedInput.value = breedName
        }
    }
})

form.addEventListener('submit', submitForm)

toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('active')
})
// End Add Event



// Call functions

// Get data from localstorage, If there is no pet data stored, create default pet list like below
petList = getFromStorage(petkey) || [
    {
        id: 'P001',
        name: 'Tom',
        age: 3,
        type: 'Cat',
        weight: 4,
        length: 5,
        breed: 'Tabby',
        color: '#000000',
        vaccinated: true,
        dewormed: true,
        sterilized: false,
        date: new Date(),
        BMI: '?'
    },
    {
        id: 'P002',
        name: 'Jack',
        age: 3,
        type: 'Dog',
        weight: 4,
        length: 5,
        breed: 'Husky',
        color: '#000000',
        vaccinated: true,
        dewormed: true,
        sterilized: true,
        date: new Date(),
        BMI: '?'
    }, {
        id: 'P003',
        name: 'Tom',
        age: 3,
        type: 'Dog',
        weight: 4,
        length: 5,
        breed: 'Mixed Breed',
        color: '#000000',
        vaccinated: true,
        dewormed: true,
        sterilized: true,
        date: new Date(),
        BMI: '?'
    }
];
saveToStorage(petkey, petList);
breedList = getFromStorage(breedKey) || [];

renderBreed(breedList)
renderTableData(petList);
