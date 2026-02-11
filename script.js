// Your Firebase configuration from your screenshot
const firebaseConfig = {
  apiKey: "AIzaSyBOcb5WDMLjogdFx3xTc49U9G1CF65QKZ0",
  authDomain: "demoapp-e30c3.firebaseapp.com",
  projectId: "demoapp-e30c3",
  storageBucket: "demoapp-e30c3.firebasestorage.app",
  messagingSenderId: "115115147585",
  appId: "1:115115147585:web:a4eb481d1e8be82ccc21c0",
  measurementId: "G-W32B8RVH8N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const tasksRef = database.ref('tasks');

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to add task to the Cloud
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;
    
    // This pushes the data to Google's servers
    tasksRef.push().set(text);
    taskInput.value = '';
}

// "Listening" for changes - This makes the app sync across all phones
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

// Function to delete from the Cloud
function removeTask(id) {
    database.ref('tasks/' + id).remove();
}
