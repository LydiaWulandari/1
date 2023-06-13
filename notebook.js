let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === '') {
    console.log('failure');
    msg.innerHTML = 'Task cannot be blank';
  } else {
    console.log('success');
    msg.innerHTML = '';
    acceptData();
    add.setAttribute('data-bs-dismiss', 'modal');
    add.click();

    (() => {
      add.setAttribute('data-bs-dismiss', '');
    })();
  }
};

let data2 = [{}];

let acceptData = () => {
  data2.push({
    text: textInput.value,
    description: textarea.value,
  });

  localStorage.setItem('data2', JSON.stringify(data2));

  console.log(data2);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = '';
  data2.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.description}</span>
          
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i><i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data2.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem('data2', JSON.stringify(data2));
  console.log(data2);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  textarea.value = selectedTask.children[1].innerHTML;
};

let resetForm = () => {
  textInput.value = '';
};

(() => {
  data2 = JSON.parse(localStorage.getItem('data2')) || [];
  console.log(data2);
  createTasks();
})();
