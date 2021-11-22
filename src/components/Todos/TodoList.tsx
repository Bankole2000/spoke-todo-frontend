import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTodos } from '../../redux/actions/todoActions';
import { RootState } from '../../redux/reducers';
import { Grid, Grow, Box, LinearProgress, Typography, Collapse, Alert, AlertTitle, Button, Backdrop, CircularProgress, AlertColor } from '@mui/material';
import { SettingsBackupRestore as SettingsBackupRestoreIcon } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group';
import TodoItem from './TodoItem';
import { Todo } from '../../interfaces/TodoInterface';

const TodoList: React.FunctionComponent = () => {

  const todos: Todo[] = useSelector((state: RootState) => state.todos["todos"])
  const errors: string[] = useSelector((state: RootState) => state.todos["errors"]);
  const loading: boolean = useSelector((state: RootState) => state.todos["loading"]);
  const message: string = useSelector((state: RootState) => state.todos["message"]);
  const messageType: AlertColor = useSelector((state: RootState) => state.todos["messageType"]);
  const dispatch = useDispatch();

  // const { getAllTodos } = bindActionCreators(actionCreators, dispatch)
  const reloadAllTodos = () => {
    dispatch(getTodos())
  }

  useEffect(() => {
    dispatch(getTodos())
  }, [])

  return (
    <div style={{ maxWidth: '80vw', margin: '20px auto', position: 'relative' }}>
      {
        !loading &&
        <Collapse in={Boolean(errors.length)}>
          <Alert severity={messageType} sx={{ mb: 1 }} action={
            <Button color="inherit" onClick={reloadAllTodos} endIcon={<SettingsBackupRestoreIcon />} size="small">
              RESET
            </Button>
          }>{message}</Alert>
        </Collapse>
      }
      {loading &&
        <Collapse in={!todos.length && !errors.length}>
          <Box sx={{ width: '100%' }}>
            <Typography style={{ textAlign: 'center', fontWeight: 'bold' }} color="secondary" variant="h5" component="div">
              Loading...
            </Typography>
            <LinearProgress style={{ height: '10px', borderRadius: '10px', maxWidth: '60%', margin: '10px auto' }} />
          </Box>
        </Collapse>
      }

      <Collapse in={todos.length > 0}>
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

      {!loading && !errors.length &&
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
      }{loading &&
        <Backdrop
          sx={{ color: (theme) => theme.palette.primary.main, zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }}
          open={Boolean(todos.length)}
          invisible
        >
          <CircularProgress color="primary" />
        </Backdrop>
      }
      {/* Todo List Component
      <button onClick={() => dispatch(getSingleTodo(6))}>Just a button</button> */}
    </div>
  );
};

export default TodoList;
