export type State = {
  tasks: TasksState
}

export type TasksState = {
  tasks: Task[],
  settings: Settings,
  isOpened: boolean,
  openedTaskId: number,
}

export type Task = {
  id: number, 
  title: string,
  content: string,
}

export type Settings = SettingsElement[]

export type SettingsElement = {
  name: string,
  value: string | boolean,
}