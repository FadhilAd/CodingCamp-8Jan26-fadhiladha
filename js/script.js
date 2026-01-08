const form = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const todoList = document.getElementById("todoList");
const filterButtons = document.querySelectorAll(".filter button");

let todos = [];

// ADD TODO
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (todoInput.value === "" || dateInput.value === "") {
    alert("To-Do dan tanggal wajib diisi!");
    return;
  }

  todos.push({
    text: todoInput.value,
    date: dateInput.value
  });

  todoInput.value = "";
  dateInput.value = "";

  renderTodos(todos);
});

// RENDER LIST
function renderTodos(data) {
  todoList.innerHTML = "";

  data.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo.text} <small>(${todo.date})</small></span>
      <span class="delete" onclick="deleteTodo(${index})">✕</span>
    `;
    todoList.appendChild(li);
  });
}

// DELETE
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos(todos);
}

// FILTER
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    if (button.dataset.filter === "today") {
      const today = new Date().toISOString().split("T")[0];
      const filtered = todos.filter(todo => todo.date === today);
      renderTodos(filtered);
    } else {
      renderTodos(todos);
    }
  });
});
