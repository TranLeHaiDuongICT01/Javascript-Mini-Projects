'use strict';

const PAGE_SIZE_KEY = 'PageSize'
const apiKey = 'e0a87bbbc59d48ee8d12519be98f2ca5'
const API_PATH = 'https://newsapi.org/v2/top-headlines'
const CURRENT_USER_KEY = 'CURRENT_USERS'

let country = 'us'
let pageSize = Number(getFromStorage(PAGE_SIZE_KEY)) || 15
let page = 1
let totalPage = 1
let currentUser = getFromStorage(CURRENT_USER_KEY) || {}
let data = {}
let searchTag = ''

// Select DOM
const pagination = document.querySelector('.pagination')
const btnPrev = document.getElementById('btn-prev')
const btnNext = document.getElementById('btn-next')
const newsContainter = document.getElementById('news-container')
const btnSearch = document.getElementById('btn-submit')
const inputSearch = document.getElementById('input-query')
const form = document.getElementById('form-search')
//



// Create Functions
function parseUser(userData) {
    const user = new User(userData.firstName, userData.lastName, userData.userName, userData.password)
    return user
}

const getData = (pData) => Promise.resolve(pData)

const fetchData = async (searchTag, apiKey, pageSize, page) => {
    if (searchTag === '') return alert('Please fill in search tag')
    if (currentUser.userName) {
        const user = parseUser(currentUser)
        const pData = user.fetchApiByTag(searchTag, apiKey, pageSize, page)
        data = await getData(pData)

        // Get maximum of 100 news only
        totalPage = Math.ceil(data?.totalResults / pageSize) <= 100 / pageSize ? Math.ceil(data?.totalResults / pageSize) : Math.floor(100 / pageSize)
        //

        displayPagination()
        displayNews()
    }else {
        alert('You are not logged in')
        window.location.href = '../pages/login.html'
    }
}

const displayPagination = () => {
    pagination.innerHTML = ''
    let html = `<li class="page-item ${page === 1 ? 'hide-btn' : ''}">
    <button class="page-link" href="#" id="btn-prev">Previous</button>
</li>`;

    for (let i = 1; i <= totalPage; i++) {
        html += `<li class="page-item ${page === i ? 'active' : ''}">
        <a class="page-link page-num-class" id="page-num-${i}" data-page="${i}">${i}</a>
    </li>`
    }

    html += `<li class="page-item ${page === totalPage ? 'hide-btn' : ''}">
    <button class="page-link" id="btn-next">Next</button>
</li>`;
    pagination.insertAdjacentHTML('beforeend', html)
}

const displayNews = () => {
    newsContainter.innerHTML = ''
    let html = ''
    data?.articles?.forEach(news => {
        html += `<div class="news">
        <img class="news-image" src="${news?.urlToImage || 'https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg'}"
            alt="">
        <div class="news-content">
        <h2>${news?.title || ''}</h2>
        <p>${news?.description || ''}</p>
        <div class="btn-container">
            <button class="btn btn-primary btn-view">View</button>
        </div>
        </div>
    </div>`
    });
    newsContainter.insertAdjacentHTML('beforeend', html)
}
//



// Handle Events
pagination.addEventListener('click', (e) => {
    e.preventDefault()

    // Previous page
    if (e?.target?.id === 'btn-prev') {
        if (page === 1) return
        page--
        fetchData(searchTag, apiKey, pageSize, page)
    }

    // Next page
    if (e?.target?.id === 'btn-next') {
        if (page === totalPage) return
        page++
        fetchData(searchTag, apiKey, pageSize, page)
    }

    // Choose page number
    if (e?.target?.classList.contains('page-num-class')) {
        page = Number(e?.target?.dataset?.page)
        fetchData(searchTag, apiKey, pageSize, page)
    }
})

btnSearch.addEventListener('click', () => {
    searchTag = inputSearch.value
    fetchData(searchTag, apiKey, pageSize, page)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
})
//

