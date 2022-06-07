'use strict';
const petkey = 'pet'
let petList = getFromStorage(petkey) || []
let importPetList = []
const epxortBtn = document.getElementById('export-btn')
const form = document.getElementById('form')
const inputFile = document.getElementById('input-file')
const toggleSidebar = document.getElementById('sidebar-title')


const exportToJsonFile = () => {
    let dataStr = JSON.stringify(petList, null, "\t");
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

const importJsonFile = (e) => {
    e.preventDefault()
    if(importPetList.length === 0)
        return alert('Import json file first')

    importPetList.forEach(pet => {
        let index = petList.findIndex(p => p?.id === pet?.id)
        if(index !== -1) {
            console.log(petList[index]);
            petList[index] = pet
        }
        else petList.push(pet)
    })

    saveToStorage(petkey, petList);
    alert('Import file successfully')
    inputFile.value = ''
}

inputFile.addEventListener('change', (e) => {
    const file = e?.target?.files[0]
    if (file?.type !== "application/json")
        return alert('Please import json file only')
    const reader = new FileReader()
    reader.onload = (event) => {
        importPetList = JSON.parse(event?.target?.result)
    }
    reader.readAsText(file)
})

epxortBtn.addEventListener('click', exportToJsonFile)

form.addEventListener('submit', importJsonFile)

toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('active')
})