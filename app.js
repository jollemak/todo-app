const form = document.querySelector('form')
const textInput = document.getElementById('text-input')
const ulList = document.getElementById('todo-list')

todoList = getTodos();
console.log(todoList);

createListItem(todoList)


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const todo = textInput.value.trim()
    if (todo.length > 0) {
    e.preventDefault();
    
    todoList.push(todo)
        createListItem(todoList);
        saveTodos(todoList);

}
    
});

function createListItem(todoArray) {
    
ulList.innerHTML = ""

    todoArray.forEach((todo, index) => {
        
        const todoItem = document.createElement('li')
        todoItem.id = `todo-item-${index}`
        todoItem.className = 'todo-item'
        todoItem.innerHTML = `
        <input type="checkbox" id="${index}"> 
                <p id="todo-text">${todo}</p>
               
                <button id="${index}">DELETE</button> 
`
        ulList.appendChild(todoItem)
    });
}

ulList.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('button')
    if (deleteBtn) {
        const btnID = parseInt(deleteBtn.id)  
        todoList.splice(btnID, 1)
        saveTodos(todoList)
        createListItem(todoList)
    }
});

function saveTodos() {
    const todosJson = JSON.stringify(todoList)
    localStorage.setItem('todos', todosJson)
}

function getTodos() {
    const todos = localStorage.getItem('todos') || '[]'
    return JSON.parse(todos)
}