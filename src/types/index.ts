export type State = {
  Tasks: TasksState
}

export type TasksState = {
  tasks: Task[]
  status: 'idle' | 'pending' | 'succeeded' | 'rejected',
  isOpened: boolean,
  openedTaskId: number,
}

export type Task = {
  id: number, 
  title: string,
  content: string,

}