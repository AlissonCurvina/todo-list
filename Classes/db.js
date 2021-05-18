import Task from './Task.js'
import TaskList from './TaskList.js'

const newList = [
  new Task(false,'Ligar para a Maria',false,true),
  new Task(true,'Limpar o video-game',false,false),
  new Task(true,'Revisar o roteiro',true,true)
]

const myList = new TaskList(newList)

export default myList