
let todoItems = [];

function renderToDo (todo){
    const list = document.querySelector(".js-todo-list")

    const item = document.querySelector(`[data-key='${todo.id}']`)

    if(todo.deleted) {
        //remove item from the DOM
        item.remove();
        return
    }
    
    const isChecked = todo.checked ? 'done' : '';

    const node = document.createElement("li");

    node.setAttribute('class', `todo-item ${isChecked}`)
    node.setAttribute('data-key', todo.id)

    node.innerHTML = `
    <input id='${todo.id}' type= 'checkbox' />
    <label for = '${todo.id}' class = 'tick js-tick'></label>
    <span> ${todo.text}</span>
    <button class= 'delete-todo js-delete-todo'>
    <svg><use href='#delete-icon'</use></svg>
    </button>
    `
    //if the item already exists in the DOM
    if (item) {
        //replace it
        list.replaceChild(node, item)
    } else {
        //otherwise append it to the end of the list
        list.append(node)
    }
}

function addToDo (text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo)
    renderToDo(todo)
}

function toggleDone(key) {
    //findIndex is an array method that returns the position of an element
    const index = todoItems.findIndex(item => item.id === Number(key));

    todoItems[index].checked =! todoItems[index].checked;
    renderToDo(todoItems[index]);
}

function deleteToDo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));

    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    //remove the todo item from the array by filtering it out

    todoItems = todoItems.filter(item => item.id !== Number(key))
    renderToDo(todo);
}
//select form element
const form = document.querySelector(".js-form")

//add a submit event listener
form.addEventListener('submit', event => {
    event.preventDefault()
// select text input
const input = document.querySelector('.js-todo-input')

const text = input.value.trim()
if (text !== ''){
    addToDo(text)
    input.value = ''
    input.focus();
}
})

//mark a task complete
const list = document.querySelector('.js-todo-list');
//adding an event listener
list.addEventListener('click', e => {
    if(e.target.classList.contains('js-tick')){
        const itemKey = e.target.parentElement.dataset.key;
        toggleDone(itemKey)
    }

    if(e.target.classList.contains('js-delete-todo')) {
        const itemKey = e.target.parentElement.dataset.key;
        deleteToDo(itemKey)
    }
})

