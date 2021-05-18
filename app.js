import myList from './Classes/db.js'
import Task from './Classes/Task.js'

const body = document.getElementsByTagName('body')[0]
const currentList = document.querySelector('.list')
const createListButton = document.querySelector('.input-new-list')
const createTaskContainer = document.querySelector('.create-task')
const inputNewTask = document.querySelector('.input-new-task')
const inputNewTaskButton = document.querySelector('#input-new-task-button')
const listSelectors = document.querySelectorAll('.data-list-selector')

const myListBadge = document.querySelector('.my-list-badge')
const importantBadge = document.querySelector('.important-badge')
const checkedBadge = document.querySelector('.checked-badge')
const allTasksBadge = document.querySelector('.all-tasks-badge')

const fullListSize = myList.getFullTaskList().length
const checkedListSize = myList.getCheckedItems().length
const importantListSize = myList.getImportantItems().length
const myListSize = myList.getTaskList().length

let editModal = document.getElementById('editModal')
let currentListView

const refreshBadges = () => {
  const fullListSize = myList.getFullTaskList().length
  const checkedListSize = myList.getCheckedItems().length
  const importantListSize = myList.getImportantItems().length
  const myListSize = myList.getTaskList().length

  myListBadge.innerHTML = myListSize
  importantBadge.innerHTML = importantListSize
  checkedBadge.innerHTML = checkedListSize
  allTasksBadge.innerHTML = fullListSize
}

const selectList = listName => {
  refreshBadges()

  switch(listName) {
    case 'my-list': 
      loadListView(myList.getTaskList())
      currentListView = 'my-list'
      break
    case 'important': 
      loadListView(myList.getImportantItems())
      currentListView = 'important'
      break
    case 'checked':
      loadListView(myList.getCheckedItems())
      currentListView = 'checked'
      break
    case 'full-list':
      loadListView(myList.getFullTaskList())
      currentListView = 'full-list'
      break
  }
}

listSelectors.forEach( selector => {
  selector.addEventListener('click', event => {
    selectList(
      event.currentTarget.getAttribute('data-list-name')
    )}
  )
})

const deleteButtonHandler = taskName => {
  const currentListItems =  myList.getFullTaskList()

  const taskToDelete = currentListItems.find( task => task.itemName == taskName )

  myList.deleteTask(taskToDelete.itemName)
  selectList(currentListView)
}

const favoriteButtonHandler = taskToFavorite => {
  const currentListItems =  myList.getFullTaskList()

  const taskToUpdate = currentListItems.find( task => task.itemName == taskToFavorite )

  taskToUpdate.setImportantTask()
  selectList(currentListView)

  refreshBadges()
}

const editButtonHandler = taskToEdit => {
  console.log(taskToEdit)
}

const loadListView = listToView => {
  refreshBadges()

  currentList.innerHTML = ""
  listToView.forEach( item => {
    currentList.innerHTML += 
    `
    <li>
      <input type="checkbox">
      <span>${item.itemName}</span>
      <span item-options>
        <span 
          data-name="${item.itemName}" 
          class="delete-button material-icons"
        >delete</span>

        <span 
          data-name="${item.itemName}" 
          class="star-button material-icons" 
          data-favorated="${item.important}"
        >star</span>

        <span 
          data-name="${item.itemName}" 
          class="edit-button material-icons"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
        >edit</span>
      </span>
    </li>
    `
  })
  
  if(currentList.innerHTML == "") {
    currentList.innerHTML = 
    `
      <li>Não há itens por aqui</li>
    `
  }

  const deleteButtons = document.querySelectorAll('.delete-button')
  const favoriteButtons = document.querySelectorAll('.star-button')
  const editButtons = document.querySelectorAll('.edit-button')

  deleteButtons.forEach( button => {
    button.addEventListener('click', event => {
      const taskName = event.target.getAttribute('data-name')
      deleteButtonHandler(taskName)
    })
  })

  favoriteButtons.forEach( button => {
    button.addEventListener('click', event => {
      const taskName = event.target.getAttribute('data-name')
      favoriteButtonHandler(taskName)
    })
  })

  editButtons.forEach( button => {
    button.addEventListener('click', event => {
      const taskName = event.target.getAttribute('data-name')
      editButtonHandler(taskName)
    })
  })
  
}

window.addEventListener('load', () => {
  currentListView = 'important'
  loadListView(myList.getImportantItems())
})

editModal.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget
  const itemName = button.getAttribute('data-name')
  const taskInfo = myList.getTask(itemName)

  const modalTitle = editModal.querySelector('.modal-title')
  const modalBody = editModal.querySelector('.modal-body')

  console.log(taskInfo)
  
  modalTitle.textContent = itemName
  modalBody.innerHTML = 
  `
  <span item-options>
    <span 
      data-name="${taskInfo.itemName}" 
      class="delete-button material-icons"
    >delete</span>

    <span 
      data-name="${taskInfo.itemName}" 
      class="star-button material-icons" 
      data-favorated="${taskInfo.important}"
    >star</span>

    <span 
      data-name="${taskInfo.itemName}" 
      class="edit-button material-icons"
    >edit</span>
  </span>
  `
})

const handleaddNewTaskInput = trigger => {
  if(trigger == inputNewTask) {
    inputNewTask.innerHTML = ''
  }
}

const addNewTask = input => {
  if(inputNewTask.innerHTML == '') {
    return
  }
  const taskName = inputNewTask.innerHTML.trim()

  const newTask = new Task(false,taskName,false)
  myList.addTask(newTask)

  loadListView(myList.getTaskList())
}

createTaskContainer.addEventListener('click', event => {
  const trigger = event.target

  switch(trigger) {
    case inputNewTask: handleaddNewTaskInput(trigger)
    break
    case inputNewTaskButton: addNewTask(trigger)
    break
  }
})