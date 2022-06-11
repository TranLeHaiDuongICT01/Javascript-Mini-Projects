'use strict'

const TASK_LIST_KEY = 'tasks'
const CURRENT_USER_KEY = 'CURRENT_USERS'
let currentUser = getFromStorage(CURRENT_USER_KEY) || {}
let taskArr = getFromStorage(TASK_LIST_KEY) || []
let taskArrUser = taskArr.filter(task => task?.owner === currentUser?.userName)



// Select DOM Elements
const inputTask = document.getElementById('input-task')
const btnAdd = document.getElementById('btn-add')
const todoList = document.getElementById('todo-list')
//


// Create Functions
const getUserTask = () => {
    return taskArr.filter(task => task?.owner === currentUser?.userName)
}

const addTask = () => {
    const taskName = inputTask.value

    if (!currentUser.userName) {
        return alert("You haven't logged in yet")
    }

    if (!taskName || taskName.trim().length === 0) {
        return alert('Please fill in the task name')
    }

    if (taskArrUser.findIndex(task => task?.task === taskName) !== -1)
        return alert('Task already exists')
    const newTask = new Task(taskName, currentUser?.userName)
    taskArr.push({
        task: newTask?.task,
        owner: newTask?.owner,
        isDone: newTask?.isDone
    })
    taskArrUser = getUserTask()
    inputTask.value = ''
    saveToStorage(TASK_LIST_KEY, taskArr)
    displayTasks()
}

const displayTasks = () => {
    if (!currentUser.userName) {
        alert("You haven't logged in yet")
        window.location.href = '../pages/login.html'
    }

    todoList.innerHTML = ''

    let html = ''
    taskArrUser.forEach(task => {
        html += `<li class="task ${task?.isDone ? 'checked' : ''}" data-task="${task?.task || ''}">
        ${task?.task}
        <span class="close">×</span>
    </li>`
    })

    todoList.insertAdjacentHTML('beforeend', html)
}

const deleteTask = (e) => {
    const index = taskArr.findIndex(task => task?.task === e.target.closest('.task')?.dataset?.task && task?.owner === currentUser?.userName)
    if (index === -1) return alert('Task not found')
    if (window.confirm('Are you sure to delete this task')) {
        taskArr.splice(index, 1)
        saveToStorage(TASK_LIST_KEY, taskArr)
        taskArrUser = getUserTask()
        displayTasks()
    }
}

const toggleTask = (e) => {
    taskArr = taskArr.map(task => {
        if (task?.task === e.target.dataset.task && task?.owner === currentUser?.userName) {
            return {
                task: task?.task,
                owner: task?.owner,
                isDone: !task?.isDone
            }
        }
        return task
    })
    saveToStorage(TASK_LIST_KEY, taskArr)
    taskArrUser = getUserTask()
    displayTasks()
}
//



// Handle Events
btnAdd.addEventListener('click', addTask)

todoList.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('close')) {
        deleteTask(e)
        return
    }

    if (e.target.classList.contains('task')) {
        toggleTask(e)
        return
    }
})
//


displayTasks()