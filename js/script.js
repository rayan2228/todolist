// selector
let searchInputElm = document.querySelector("#searchtextbox")
let addTaskInputElm = document.querySelector("#addtaskinput")
let saveIndexElm = document.querySelector("#saveindex")
let addTaskBtnElm = document.querySelector("#addtaskbtn")
let saveTaskBtnElm = document.querySelector("#savetaskbtn")
let listElm = document.querySelector(".list")
let deleteAllBtnElm = document.querySelector("#deleteallbtn")
let msg = document.querySelector(".msg")

// all evenlistener 
const allEvanListener = () => {
  addTaskBtnElm.addEventListener("click", SaveTaskLocalStorage)
  saveTaskBtnElm.addEventListener("click", saveTask)
  deleteAllBtnElm.addEventListener("click", deleteAllTask)
  searchInputElm.addEventListener("input", filleterTask)
}

msg.innerHTML = "No Task to Show"
// Save task in Local storage
const SaveTaskLocalStorage = () => {
  let addTaskInputVal = addTaskInputElm.value
  if (addTaskInputVal === "") {
    alert("please add a task")
  } else {
    let checkLocalStorage = localStorage.getItem("allTasks")
    if (checkLocalStorage === null) {
      taskList = []
    } else {
      taskList = JSON.parse(checkLocalStorage)
    }
    taskList.push(addTaskInputVal)
    localStorage.setItem("allTasks", JSON.stringify(taskList))
    ShowTaskList()
    addTaskInputElm.value = ""
  }
}
// Show task Lists
const ShowTaskList = () => {
  let checkLocalStorage = localStorage.getItem("allTasks")
  if (checkLocalStorage === null) {
    taskList = []
  } else {
    taskList = JSON.parse(checkLocalStorage)
    let listItem = ""
    taskList.forEach((item, index) => {
      listItem += ` <li><span class="task-number">${index + 1}</span><span class="task-name">${item}</span><button type="button" class="edit-task" onclick="editTask(${index})"><i class="fas fa-edit"></i>Edit</button><button type="button" class="delete-task" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i>Delete</button>
      </li>`
      listElm.innerHTML = listItem
      msg.innerHTML = ""
    });
  }

}
// edit task
const editTask = (index) => {
  let checkLocalStorage = localStorage.getItem("allTasks")
  let taskList = JSON.parse(checkLocalStorage)
  addTaskInputElm.value = taskList[index]
  saveIndexElm.value = index
  saveTaskBtnElm.style.display = "block"
  addTaskBtnElm.style.display = "none"
}

// save task
const saveTask = () => {
  let checkLocalStorage = localStorage.getItem("allTasks")
  let taskList = JSON.parse(checkLocalStorage)
  saveIndexVal = saveIndexElm.value
  taskList[saveIndexVal] = addTaskInputElm.value
  localStorage.setItem("allTasks", JSON.stringify(taskList))
  ShowTaskList()
  addTaskInputElm.value = ""
  saveTaskBtnElm.style.display = "none"
  addTaskBtnElm.style.display = "block"
}

// deleting task
const deleteTask = (index) => {
  let checkLocalStorage = localStorage.getItem("allTasks")
  let taskList = JSON.parse(checkLocalStorage)
  taskList.splice(index, 1)
  localStorage.setItem("allTasks", JSON.stringify(taskList))
  if (taskList.length === 0) {
    listElm.innerHTML = ""
    msg.innerHTML = "No Task to Show"
  }
  ShowTaskList()
}
// delete all task
const deleteAllTask = () => {
  let checkLocalStorage = localStorage.getItem("allTasks")
  let taskList = JSON.parse(checkLocalStorage)
  if (taskList.length === 0) {
    alert("No Task To Delete")
  } else {
    taskList = []
  }
  localStorage.setItem("allTasks", JSON.stringify(taskList))
  if (taskList.length === 0) {
    listElm.innerHTML = ""
    msg.innerHTML = "No Task to Show"
  }
  ShowTaskList()
  addTaskInputElm.value = ""
  saveTaskBtnElm.style.display = "none"
  addTaskBtnElm.style.display = "block"
}
// filleter task
const filleterTask = () => {
  document.querySelectorAll(".list li").forEach((item) => {
    let text = item.firstElementChild.nextElementSibling.innerText.toLowerCase()
    let searchVal = searchInputElm.value.toLowerCase()
    if (text.indexOf(searchVal) === - 1) {
      item.style.display = "none"
    } else (
      item.style.display = "flex"
    )
  })
}

// call Functions
allEvanListener()
ShowTaskList()