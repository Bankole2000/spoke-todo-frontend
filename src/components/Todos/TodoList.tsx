import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/';
import { getTodos, getSingleTodo } from '../../redux/actions/todoActions';
import { RootState } from '../../redux/reducers';
import { Grid, Grow, Box, LinearProgress, Typography, Collapse, Alert, AlertTitle, Button } from '@mui/material';
import { SettingsBackupRestore as SettingsBackupRestoreIcon } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group';
import TodoItem from './TodoItem';
import { Todo } from '../../interfaces/TodoInterface';



interface ITodoListProps {
}

const TodoList: React.FunctionComponent<ITodoListProps> = (props) => {

  const todos: Todo[] = useSelector((state: RootState) => state.todos["todos"])
  const loading: boolean = useSelector((state: RootState) => state.todos["loading"]);
  const dispatch = useDispatch();

  // const { getAllTodos } = bindActionCreators(actionCreators, dispatch)
  const reloadAllTodos = () => {
    dispatch(getTodos())
  }
  useEffect(() => {
    dispatch(getTodos())
  }, [])

  return (
    <div style={{ maxWidth: '80vw', margin: '20px auto' }}>
      {loading && !todos.length &&
        <Collapse in={loading}>
          <Box sx={{ width: '100%' }}>
            <Typography style={{ textAlign: 'center', fontWeight: 'bold' }} color="secondary" variant="h5" component="div">
              Loading...
            </Typography>
            <LinearProgress style={{ height: '10px', borderRadius: '10px', maxWidth: '60%', margin: '10px auto' }} />
          </Box>
        </Collapse>
      }
      {!loading &&
        <Collapse in={!loading && todos.length > 0}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="start" spacing={2}>
              {todos.map((todo, i) => (
                <Grid item xs={12} md={4} sm={6} key={todo.id}>
                  <TodoItem todo={todo}></TodoItem>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Collapse>
      }
      {!loading &&
        <Collapse in={!loading && todos.length === 0}>
          <Alert severity="info" action={
            <Button onClick={reloadAllTodos} endIcon={<SettingsBackupRestoreIcon />} color="info" size="large">
              RELOAD
            </Button>
          }>
            <AlertTitle>No Todos</AlertTitle>
            Looks like You don't have any todos — <strong>Let's make one 📝</strong>
          </Alert>
        </Collapse>
      }
      {/* Todo List Component
      <button onClick={() => dispatch(getSingleTodo(6))}>Just a button</button> */}
    </div>
  );
};

export default TodoList;
