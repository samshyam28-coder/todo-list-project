const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', getTasks);

function addTask() {
    if (taskInput.value === '') return;
    createTaskElement(taskInput.value);
    saveLocalTask(taskInput.value);
    taskInput.value = '';
}

function createTaskElement(text) {
    const li = document.createElement('li');
    li.innerHTML = `${text} <button class="delete-btn" onclick="removeTask(this)">Delete</button>`;
    taskList.appendChild(li);
}

function removeTask(btn) {
    const text = btn.parentElement.firstChild.textContent.trim();
    btn.parentElement.remove();
    removeLocalTask(text);
}

function saveLocalTask(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}

function removeLocalTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
