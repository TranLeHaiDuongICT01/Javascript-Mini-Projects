'use strict'

const PAGE_SIZE_KEY = 'PageSize'
const CATEGORY_KEY = 'Category'
const apiKey = 'e0a87bbbc59d48ee8d12519be98f2ca5'
const API_PATH = 'https://newsapi.org/v2/top-headlines'
const CURRENT_USER_KEY = 'CURRENT_USERS'

let country = 'us'
let category = getFromStorage(CATEGORY_KEY)?.toLowerCase() || 'general'
let pageSize = Number(getFromStorage(PAGE_SIZE_KEY)) || 15
let page = 1
let totalPage = 1
let currentUser = getFromStorage(CURRENT_USER_KEY) || {}
let data = {}

// Select DOM Elements
const pagination = document.querySelector('.pagination')
const btnPrev = document.getElementById('btn-prev')
const btnNext = document.getElementById('btn-next')
const newsContainter = document.getElementById('news-container')
//



// Create Functions
function parseUser(userData) {
    const user = new User(userData.firstName, userData.lastName, userData.userName, userData.password)
    return user
}

const getData = (pData) => Promise.resolve(pData)

const fetchData = async (API_PATH, country, category, pageSize, page, apiKey) => {
    if (currentUser.userName) {
        const user = parseUser(currentUser)
        const pData = user.fetchApi(API_PATH, country, category, pageSize, page, apiKey)
        data = await getData(pData)
        totalPage = Math.ceil(data?.totalResults / pageSize)
        displayPagination()
        displayNews()
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
    if (e?.target?.id === 'btn-prev') {
        if (page === 1) return
        page--
        fetchData(API_PATH, country, category, pageSize, page, apiKey)
    }
    if (e?.target?.id === 'btn-next') {
        if (page === totalPage) return
        page++
        fetchData(API_PATH, country, category, pageSize, page, apiKey)
    }
    if (e?.target?.classList.contains('page-num-class')) {
        page = Number(e?.target?.dataset?.page)
        fetchData(API_PATH, country, category, pageSize, page, apiKey)
    }
})
//



// Call Functions
fetchData(API_PATH, country, category, pageSize, page, apiKey)
//