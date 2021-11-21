import { FunctionComponent } from "react";
import { Container, Typography } from "@mui/material";

import TodoForm from "../components/forms/NewTodoForm";
import TodoList from "../components/Todos/TodoList";

interface TodoListPageProps {

}

const TodoListPage: FunctionComponent<TodoListPageProps> = () => {
  return (
    <div style={{ minWidth: '100vw' }}>
      <Container maxWidth="sm">
        {/* <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Add a todo
        </Typography> */}
      </Container>
      <TodoForm />
      <div style={{ width: '80vw', margin: '0px auto' }}>
        <h1 style={{marginBottom: '5px'}}>Your Current Todos</h1>
        <hr />
      </div>

      <TodoList />

    </div>
  );
}

export default TodoListPage;