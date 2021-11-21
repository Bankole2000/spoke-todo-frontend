export type Todo = {
  id?: string;
  title: string,
  notes: string,
  subtasks: Subtask[],
  completed: boolean,
  createdAt?: string,
  updatedAt?: string
}

export type Subtask = {
  title: string,
  completed: boolean,
}