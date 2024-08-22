export type State = {
  tasks: TasksState
}

export type TasksState = {
  tasks: Task[]
  isOpened: boolean,
  openedTaskId: number,
}

export type Task = {
  id: number, 
  title: string,
  content: string,

}