const todoSearchBtn = document.getElementById('todo-search-button');
const todoUl = document.getElementById('todo-ul')
const todoLi = document.getElementById('todo-li')
const todoLiText = document.getElementById('todo-li-text')
const todoDeleteBtn = document.getElementById('todo-delete-btn')
const todoBarText = document.getElementById('todo-bar-text')

//New Li Creation
todoSearchBtn.addEventListener('click', () => {
  // console.log("I am Clicked from Search Btn");
  const newTodoLi = document.createElement('li')
  newTodoLi.classList.add('todo-li')
  newTodoLi.id = 'todo-li'


  const todoInput = document.createElement('input')
  todoInput.classList.add('todo-li-text')
  todoInput.id = 'todo-li-text'
  // console.log(todoBarText.value);
  todoInput.value = todoBarText.value;
  todoBarText.value = '';

  const todoEnterBtn = document.createElement('button')
  todoEnterBtn.classList.add('todo-enter-btn')
  todoEnterBtn.id = 'todo-enter-btn'
  todoEnterBtn.innerHTML = `     <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
                                    d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
                                    fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
                                    fill="white" />
                                    </svg>`


  const todoDeleteBtn = document.createElement('button')
  todoDeleteBtn.classList.add('todo-delete-btn')
  todoDeleteBtn.id = 'todo-delete-btn'
  todoDeleteBtn.innerHTML = `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                                    fill="white" />
                                    <path d="M9 9H11V17H9V9Z" fill="white" />
                                    <path d="M13 9H15V17H13V9Z" fill="white" />
                                    </svg>`;

  newTodoLi.append(todoInput)
  newTodoLi.append(todoEnterBtn)
  newTodoLi.append(todoDeleteBtn)
  todoUl.appendChild(newTodoLi)


  //Api Call
  const userid = 1;
  function fetchToDoApi(userid) {
    const url = `https://dummyjson.com/users/${userid}/todos`
    fetch(url, {
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json' 
      }
      }).then(response=>{
      if (response.ok) {
        console.log("Todo Api Called", response.status);
      }
    }).catch(error=>{
      console.log("Todo Api Error", error);
      
    })
  }
  fetchToDoApi(userid)
})

//Delete Button Strike Through
document.addEventListener('click', (event) => {
  // Find the closest button with class 'todo-delete-btn'
  const btn = event.target.closest('.todo-delete-btn');
  if (btn) {
    // If a delete button was clicked, find its parent 'li'
    const li = btn.closest('li');

    // Perform your actions on the 'li' element
    if (li) {
      const isClicked = li.getAttribute('data-clicked') === 'true';
      if (!isClicked) {
        // console.log("I am Clicked Delete Btn");
        li.style.opacity = '0.3';
        li.querySelector('.todo-li-text').style.textDecoration = 'line-through';
        li.setAttribute('data-clicked', 'true');
      }
      else {
        // Second click: remove the 'li'
        li.remove();
        // console.log("else clicked Delete Btn");
      }
    }
  }

});

//Enter Button to remove strike through
document.addEventListener('click', (event) => {
  const btn = event.target.closest('.todo-enter-btn');
  if (btn) {
    const li = btn.closest('li');
    li.querySelector('.todo-li-text').style.textDecoration = 'line-through';
    li.querySelector('.todo-li-text').style.color = 'green'
    li.querySelector('.todo-li-text').style.fontWeight = 'bold';
  }
  if (btn) {

    // Perform your actions on the 'li' element
    if (li) {
      const isClicked = li.getAttribute('data-clicked') === 'true';
      if (!isClicked) {
        // console.log("I am Clicked Delete Btn");
        li.style.opacity = '0.3';
        li.querySelector('.todo-li-text').style.textDecoration = 'line-through';
        li.setAttribute('data-clicked', 'true');
      }
      else {
        // Second click: remove the 'li'
        li.remove();
        // console.log("else clicked Delete Btn");
      }
    }
  }
})

//User Click Logout Option
const user = document.getElementById('user');
user.addEventListener('click', () => {
  const logout = document.querySelector('#logout');
  if (logout.style.display === 'none' || logout.style.display === '') {
    logout.style.display = 'block';
  }
  else if (logout.style.display === 'block') {
    logout.style.display = 'none'
  }
})

