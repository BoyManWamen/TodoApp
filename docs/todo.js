let todos = [];

function loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    todos = storedTodos || [];
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleTodo(${todo.id})">
            <span>${todo.title}</span>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });

    saveTodos();
}

function addTodo() {
    const titleInput = document.getElementById('title');
    const title = titleInput.value.trim();

    if (title) {
        const newTodo = {
            id: Date.now(),
            title,
            completed: false
        };

        todos.push(newTodo);
        titleInput.value = '';
        renderTodos();
    }
}

function toggleTodo(todoId) {
    todos = todos.map(todo => {
        if (todo.id === todoId) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });

    renderTodos();
}

function deleteTodo(todoId) {
    todos = todos.filter(todo => todo.id !== todoId);
    renderTodos();
}

document.getElementById('addForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
});

loadTodos();
renderTodos();
