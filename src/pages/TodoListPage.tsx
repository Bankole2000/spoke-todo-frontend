import { FunctionComponent } from "react";

import TodoForm from "../components/forms/NewTodoForm";
import TodoList from "../components/Todos/TodoList";


const TodoListPage: FunctionComponent = () => {
  return (
    <div style={{ minWidth: '100vw' }}>

      <TodoForm />

      <div style={{ width: '80vw', margin: '0px auto' }}>
        <h1 style={{ marginBottom: '5px' }}>Your Current Todos</h1>
        <hr />
      </div>

      <TodoList />

    </div>
  );
}

export default TodoListPage;