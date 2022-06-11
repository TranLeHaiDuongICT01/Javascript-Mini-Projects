'use strict'

class User {
    constructor(firstName, lastName, userName, password) {
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
        this.password = password
    }

    fetchApi = async (url, country, category, pageSize, page, apiKey) => {
        const response = await fetch(`${url}?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`)
        const data = await response.json()
        return data
    }

    fetchApiByTag = async (searchTag, apiKey, pageSize, page) => {
        const response = await fetch(`https://newsapi.org/v2/everything?pageSize=${pageSize}&page=${page}&q=${searchTag}&apiKey=${apiKey}`)
        const data = await response.json()
        return data
    }
}

// ?country=us&category=science&pageSize=25&page=1&apiKey=e0a87bbbc59d48ee8d12519be98f2ca5