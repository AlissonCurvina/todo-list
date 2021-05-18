export default class TaskList {
  constructor(taskList) {
    this.fullTaskList = taskList
  }

  getTask(taskName) {
    return this.fullTaskList.find( task => task.itemName == taskName)
  }

  getTaskList() {
    return this.fullTaskList.filter( item => !item.checked )
  }

  getFullTaskList() {
    return this.fullTaskList
  }

  getCheckedItems() {
    return this.fullTaskList.filter( item => item.checked )
  }

  getImportantItems() {
    return this.fullTaskList.filter( item => item.important )
  }

  deleteTask(taskName) {
    const taskToRemove = this.fullTaskList.find(item => item.itemName == taskName)
    const indexOfTaskToRemove = this.fullTaskList.indexOf(taskToRemove)
    
    this.fullTaskList.splice(indexOfTaskToRemove, 1)
  }

  addTask(taskToAdd) {
    this.fullTaskList.push(taskToAdd)
  }
}