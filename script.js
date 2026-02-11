// Your Firebase Config (from your Register App screen)
const firebaseConfig = {
  apiKey: "AIzaSyBOcb5WDMLjogdFx3xTc49U9G1CF65QKZ0",
  authDomain: "demoapp-e30c3.firebaseapp.com",
  databaseURL: "https://demoapp-e30c3-default-rtdb.firebaseio.com",
  projectId: "demoapp-e30c3",
  storageBucket: "demoapp-e30c3.firebasestorage.app",
  messagingSenderId: "115115147585",
  appId: "1:115115147585:web:a4eb481d1e8be82ccc21c0"
};

// Start Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const tasksRef = database.ref('tasks');

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Sends your task to the Cloud
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;
    tasksRef.push().set(text); // Pushes to Firebase
    taskInput.value = '';
}

// Listens for changes (syncs across all devices instantly)
tasksRef.on('value', (snapshot) => {
    taskList.innerHTML = '';
    const data = snapshot.val();
    for (let id in data) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${data[id]} 
            <button class="delete-btn" onclick="removeTask('${id}')">Delete</button>
        `;
        taskList.appendChild(li);
    }
});

// Deletes from the Cloud
function removeTask(id) {
    database.ref('tasks/' + id).remove();
}
