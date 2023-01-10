
let todoItems = [];



function addToDo (text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo)
    console.log(todoItems)
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

