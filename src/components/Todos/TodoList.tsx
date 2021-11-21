import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/';
import { getTodos, getSingleTodo } from '../../redux/actions/todoActions';
import { RootState } from '../../redux/reducers';
import { Grid, Grow, Box } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import TodoItem from './TodoItem';
import { Todo } from '../../interfaces/TodoInterface';



interface ITodoListProps {
}

const TodoList: React.FunctionComponent<ITodoListProps> = (props) => {

  const todos: Todo[] = useSelector((state: RootState) => state.todos["todos"])
  const dispatch = useDispatch();

  // const { getAllTodos } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    dispatch(getTodos())
  }, [])

  return (
    <div style={{ maxWidth: '80vw', margin: '20px auto' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container justifyContent="start" spacing={2}>
          {todos.map((todo, i) => (
            <Grid item xs={12} md={4} sm={6} key={todo.id}>
              <TodoItem todo={todo}></TodoItem>
            </Grid>
          ))}
        </Grid>

      </Box>
      {/* Todo List Component
      <button onClick={() => dispatch(getSingleTodo(6))}>Just a button</button> */}
    </div>
  );
};

export default TodoList;
