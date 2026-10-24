
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Browser se saved tasks load karo
let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];

function saveTasks() {
  localStorage.setItem("studentTasks", JSON.stringify(tasks));
}

function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const listItem = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent =
      `${task.name} | ${task.subject} | Due: ${task.deadline} | Priority: ${task.priority}`;

    if (task.completed) {
      taskText.style.textDecoration = "line-through";
    }

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.textContent = task.completed
      ? "Completed"
      : "Mark Complete";
    completeButton.disabled = task.completed;

    completeButton.addEventListener("click", function () {
      task.completed = true;
      saveTasks();
      displayTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });

      saveTasks();
      displayTasks();
    });

    listItem.append(taskText, completeButton, deleteButton);
    taskList.appendChild(listItem);
  });
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = document.getElementById("task-name").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const deadline = document.getElementById("deadline").value;
  const priority = document.getElementById("priority").value;

  if (!taskName || !subject || !deadline) {
    alert("Please fill in all task details.");
    return;
  }

  const newTask = {
    id: Date.now(),
    name: taskName,
    subject: subject,
    deadline: deadline,
    priority: priority,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  displayTasks();
  taskForm.reset();
});

// Page khulte hi saved tasks dikhao
displayTasks();
