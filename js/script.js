'use strict';
// tasks data from local storage
// data for demonstration purpose
const demoTasks = [{
    name: 'Complete online JavaScript coarse',
    id: 0,
    completed: true,
  },

  {
    name: 'Jog around the park 3x',
    id: 1,
    completed: false,
  },

  {
    name: '10 minutes meditation',
    id: 2,
    completed: false,
  },

  {
    name: 'Read for 1 hour',
    id: 3,
    completed: false,
  },

  {
    name: 'Pick up groceries',
    id: 4,
    completed: false,
  },

  {
    name: 'Complete Todo App on Frontend Mentor',
    id: 5,
    completed: false,
  }
];

//creating todos and adding to ui
const heroTasks = document.querySelector('.hero__tasks') // todos container
const addingTaskToList = function(task) {
  const newTask = document.createElement('div');
  newTask.className = 'hero__tasks__task flex common-bg common-h8';
  newTask.setAttribute('completed', task.completed)
  newTask.innerHTML =
    `
  <input id="${task.id}" class="check" type="checkbox">

  <label for="${task.id}">
    <span class="custom-checkbox flex">
      <span class="custom-checkbox__inner flex">
        <img class="checkSvg" src="./images/icon-check.svg" alt="checksvg">
    </span>
      </span>

      <span class="task-name">
        ${task.name}
      </span>
  </label>

  <button class="delete-btn delete" aria-label="deleteBtn"></button>
    `;
  heroTasks.appendChild(newTask)
}

// using demo todos to create new tasks when local storage is empty
let tasks = JSON.parse(localStorage.getItem('tasks')) || demoTasks;
const displayTasksUI = function() {
  for (let task of tasks) {
    addingTaskToList(task);
  }
}

displayTasksUI();

//event creating todos and adding to ui
const form = document.querySelector('.hero__form'); // form to add todos
const inputField = document.querySelector('.hero__form__field') // input to add todos
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputField.value) {
    const randomID = Math.random();
    const userInputTask = {
      name: inputField.value,
      id: randomID,
      completed: false,
    };
    // adding to local storage
    tasks.push(userInputTask)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    countItems()

    // adding to ui
    addingTaskToList(userInputTask)
    inputField.value = '';

    // updating nodelist of checkbox according to the ui
    allCheckBox = document.querySelectorAll('.check')
    completeTask()
  }
})

// event deleting todos from ui and local storage
heroTasks.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    // deleting from ui
    const currentTask = e.target.parentElement;
    currentTask.style.animation = 'deleteAnime 1000ms ease-in-out forwards'

    setTimeout(() => {
      heroTasks.removeChild(currentTask);
    }, 1000)

    // deleting from local storage
    const taskIndex = tasks.findIndex((task) => task.id === +currentTask.firstElementChild.id);
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks))
    countItems()
  }
})

// completing todos, modifying ui and updating local storage
let allCheckBox = document.querySelectorAll('.check');
const completeTask = function() {
  for (let check of allCheckBox) {
    const currentTask = check.parentElement;
    currentTask.getAttribute('completed') === 'true' ? check.checked = true : check.checked = false;

    check.addEventListener('click', e => {
      const currentTaskId = +currentTask.firstElementChild.id;
      currentTask.setAttribute('completed', check.checked);

      for (let task of tasks) {
        if (task.id === currentTaskId) {
          task.completed = check.checked;
        }
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
      countItems()
    })
  }
}

completeTask()

// count todos
const itemCounter = document.querySelector('.info') // counting wrapper
const countItems = function() {
  const incompleteTasks = tasks.filter((task) => task.completed === false);
  itemCounter.textContent = incompleteTasks.length > 1 ?
    `${incompleteTasks.length} items left` : `${incompleteTasks.length} item left`
}

countItems()

// filtering todos
const showAll = document.querySelectorAll('.showAll'); //  All button
const showActive = document.querySelectorAll('.showActive'); // Active button
const showCompleted = document.querySelectorAll('.showCompleted'); // Completed button
let allTasksUI = document.querySelectorAll('.hero__tasks__task'); // tasks node list
const filterBtnContainer = document.querySelectorAll('.filter'); // filter button wrapper
const clearCompleted = document.querySelector('.clear-completed'); // removes completed tasks

showAll.forEach((showAllBtn) => {
  showAllBtn.addEventListener('click', e => {
    for (let uiTask of allTasksUI) {
      uiTask.style.display = 'flex';
    }
  })
})

showActive.forEach((showActivebtn) => {
  showActivebtn.addEventListener('click', e => {
    allTasksUI = document.querySelectorAll('.hero__tasks__task')
    for (let uiTask of allTasksUI) {
      uiTask.getAttribute('completed') === 'true' ?
        uiTask.style.display = 'none' : uiTask.style.display = 'flex';
    }
  })
})

showCompleted.forEach((showCompletedBtn) => {
  showCompletedBtn.addEventListener('click', e => {
    allTasksUI = document.querySelectorAll('.hero__tasks__task')
    for (let uiTask of allTasksUI) {
      uiTask.getAttribute('completed') === 'false' ?
        uiTask.style.display = 'none' : uiTask.style.display = 'flex';
    }
  })
})

filterBtnContainer.forEach((container) => {
  container.addEventListener('click', e => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    for (let btn of filterButtons) {
      e.target.id === btn.id ? btn.classList.add('selected-filter') : btn.classList.remove('selected-filter');
    }
  })

})

clearCompleted.addEventListener('click', e => {
  allTasksUI = document.querySelectorAll('.hero__tasks__task')
  // clearing from ui
  allTasksUI.forEach(uiTask => {
    if (uiTask.getAttribute('completed') === 'true') {
      heroTasks.removeChild(uiTask);
    }
  })

  // clearing from local storage
  tasks = tasks.filter(task => task.completed === false)
  localStorage.setItem('tasks', JSON.stringify(tasks))
})

// focus effect on inputfiled
inputField.addEventListener('focus', e => {
  document.body.classList.contains('light') ?
    form.style.outline = '2px dashed hsl(235, 24%, 19%)' : form.style.outline = '2px dashed white'
})

inputField.addEventListener('blur', e => {
  form.style.outline = 'none';
})

// theme toggling button action
const toggleButton = document.querySelector('.hero__heading__toggler');
document.body.setAttribute('class', localStorage.getItem('tasks.theme'))
toggleButton.addEventListener('click', e => {
  document.body.className === 'light' ? document.body.className = '' : document.body.className = 'light'
  localStorage.setItem('tasks.theme', document.body.className)
})

//sorting tasks in ui and saving in local storage
Sortable.create(heroTasks, {
  group: 'todo-tasks',
  animation: 1000,
  easing: 'ease-in-out',
  draggable: '.hero__tasks__task',
  ghostClass: 'sortable-blue',

  store: {
    get: function(sortable) {
      var order = localStorage.getItem(sortable.options.group.name);
      return order ? order.split('|') : [];
    },

    set: function(sortable) {
      var order = sortable.toArray();
      localStorage.setItem(sortable.options.group.name, order.join('|'));
    }
  }
})