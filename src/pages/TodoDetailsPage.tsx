import { Container, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface TodoDetailsPageProps {

}

const TodoDetailsPage: FunctionComponent<TodoDetailsPageProps> = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Add a todo
        </Typography>

        <h1>Todo Details Page</h1>
      </Container>
    </div>
  );
}

export default TodoDetailsPage;