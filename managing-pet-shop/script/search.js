'use strict';


let petList = [];
let breedList = [];
const petkey = 'pet'
const breedKey = 'breeds'
// Select DOM
const form = document.getElementById('form')
const inputId = document.getElementById('input-id')
const inputName = document.getElementById('input-name')
const inputType = document.getElementById('input-type')
const inputBreed = document.getElementById('input-breed')
const vaccinatedInput = document.getElementById('input-vaccinated')
const dewormedInput = document.getElementById('input-dewormed')
const sterilizedInput = document.getElementById('input-sterilized')
const clearBtn = document.getElementById('clear-btn')
const tableBody = document.getElementById('tbody')
const toggleSidebar = document.getElementById('sidebar-title')

// Functions
const renderBreed = (breedList) => {
    inputBreed.innerHTML = ''
    const tdSelect = document.createElement('option')
    tdSelect.innerHTML = 'Select Breed'
    inputBreed.appendChild(tdSelect)
    breedList.forEach(breed => {
        const breedOption = document.createElement('option')
        breedOption.innerHTML = breed?.name;
        inputBreed.appendChild(breedOption)
    })
}

const submitForm = (e) => {
    e.preventDefault();
    const id = inputId.value;
    const name = inputName.value;
    const type = inputType.value;
    const breed = inputBreed.value;
    const vaccinated = vaccinatedInput.checked;
    const dewormed = dewormedInput.checked;
    const sterilized = sterilizedInput.checked;

    let petSearch = petList.filter(pet => {
        let checkIdAndName = pet?.id?.includes(id) && pet?.name?.includes(name)

        let checkType = true
        if (type !== 'Select Type') {
            checkType = pet?.type === type
        }

        let checkBreed = true
        if (breed !== 'Select Breed') {
            checkBreed = pet?.breed === breed
        }

        let checkVaccinated = true
        if (vaccinated) {
            checkVaccinated = pet?.vaccinated
        }

        let checkDewormed = true
        if (dewormed) {
            checkDewormed = pet?.dewormed
        }

        let checkSterilized = true
        if (sterilized) {
            checkSterilized = pet?.sterilized
        }

        if (checkIdAndName && checkType && checkBreed &&
            checkVaccinated && checkDewormed && checkSterilized)
            return pet
    })

    renderTable(petSearch)
}

const clearInput = () => {
    inputId.value = '';
    inputName.value = '';
    inputType.value = 'Select Type';
    inputBreed.value = 'Select Breed';
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
}

const convertDate = (date) => {
    const convertDate = new Date(date);
    return ((convertDate.getMonth() > 8) ? (convertDate.getMonth() + 1) : ('0' + (convertDate.getMonth() + 1))) + '/' + ((convertDate.getDate() > 9) ? convertDate.getDate() : ('0' + convertDate.getDate())) + '/' + convertDate.getFullYear();
}


const renderTable = (petList) => {

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

        // Date
        const tdDate = document.createElement('td');
        tdDate.innerHTML = convertDate(petList[i].date);
        tr.appendChild(tdDate);

        tableBody.appendChild(tr)
    }
}
// End functions


// Add events
form.addEventListener('submit', submitForm)
clearBtn.addEventListener('click', clearInput)
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('active')
})
// End add events


// Call function
petList = getFromStorage(petkey) || []
breedList = getFromStorage(breedKey) || [];
renderBreed(breedList)