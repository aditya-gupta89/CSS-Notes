const todoForm = document.querySelector('#todo-form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');
let allTodos = getTodos();
appendTodoList()
todoForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    addTodo();
})

function addTodo(){
    const text = todoInput.value.trim();
    if(text.length===0){
        alert("Please enter the text ");
        return;
    }
    const todoObject = {
        text,
        completed:false
    }
    allTodos.push(todoObject)
    appendTodoList();
    saveTodos();
    todoInput.value=''
}

function appendTodoList(){
    todoListUL.innerHTML="";
    allTodos.forEach((todo,index)=>{
        todoItem= createTodo(todo,index);
        todoListUL.append(todoItem);
    })
}

function createTodo(todo,index){
    const todoId = `todo-${index}`
    const todoLi = document.createElement('li');
    todoLi.className='todo';
    todoLi.innerHTML=`
    <li class="todo">
          <input type="checkbox" id=${todoId} />
          <label class="custom-checkbox" for=${todoId}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="transparent"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label  for=${todoId} class="todo-text">
          ${todo.text}
          </label>
          <button class="delete-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#4A4D57"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
        </li>`
        const deleteButton = todoLi.querySelector(".delete-button");
        deleteButton.addEventListener("click", ()=>{
            deleteTodoItem(index);
        });
        const checkbox = todoLi.querySelector("input");
        checkbox.addEventListener('change',()=>{
            allTodos[index].completed=checkbox.checked;
            saveTodos();
        })
        checkbox.checked =todo.completed;
        return todoLi

}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i != todoIndex);
    saveTodos();
    appendTodoList();
}
function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

let darkMode = localStorage.getItem('darkmode');
let toggleSwitch = document.getElementById('toggle-switch')

toggleSwitch.addEventListener('click',()=>{
  let darkMode = localStorage.getItem('darkmode');
  darkMode==='active'?disableDarkMode():enableDarkMode();
})

if(darkMode==='active')
  enableDarkMode();

function enableDarkMode(){
  document.body.classList.add('dark-mode');
  localStorage.setItem('darkmode','active')
}
function disableDarkMode(){
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkmode',null)
}
