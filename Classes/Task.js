export default class Task {
  constructor(important,itemName,checked) {
    this.important = important
    this.itemName = itemName
    this.checked = checked
  }

  setImportantTask() {
    if(this.important) {
      this.important = false
      return
    }
    if(!this.important) {
      this.important = true
      return
    }
  }
}