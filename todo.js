let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');
let assignInput = document.getElementById('assignInput');
let statusId = document.getElementById('statusId');

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

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
    type: assignInput.value,
    status: statusId.value,
  });

  localStorage.setItem('data', JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = '';
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span
          <span class="small text-secondary"> ${x.type} &nbsp;  &nbsp;
           ${x.status} </span>
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
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  let selectedData = data[selectedTask.id]
  textInput.value = selectedData ['text'];
  dateInput.value = selectedData ['date'];
  textarea.value = selectedData ['description'];
  console.log(selectedTask.id)
  assignInput.value = selectedData['type'];
  statusId.value = selectedData ['status'];

};


let resetForm = () => {
  textInput.value = '';
  dateInput.value = '';
  textarea.value = '';
  assignInput.value = '';
  statusId.value = '';
};


(() => {
  data = JSON.parse(localStorage.getItem('data')) || [];
  console.log(data);
  createTasks();
})();