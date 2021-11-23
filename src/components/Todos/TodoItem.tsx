import * as React from 'react';
import { Todo } from '../../interfaces/TodoInterface';
import { formatTime } from '../../utils/helpers';
import { Card, CardContent, Typography, CardActions, FormControlLabel, Checkbox, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { updateTodo, deleteTodo } from '../../redux/actions/todoActions';
import { useDispatch } from "react-redux";
import { makeStyles } from '@mui/styles';
import { Link } from 'react-location';



const useStyles = makeStyles({

  todoCard: {
    background: (todo: Todo) => {
      if (todo.completed) {
        return 'linear-gradient(to top right, #e6e6e6, #f5f5f5)'
      } else {
        return 'linear-gradient(to top right, #FFF3F1, #E0F4F4)'
      }
    },
    boxShadow: "0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.042), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.04), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.04), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.04) !important;",
    '&:hover': {
      boxShadow: "0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.12), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.1), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.1), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.1) !important;"
    },

    textDecorationColor: '#c3c3c3',
    cursor: 'pointer',
  },
  todoText: {
    textDecoration: (todo: Todo) => {
      if (todo.completed) {
        return 'line-through #c3c3c3';
      } else {
        return 'none';
      }
    },
  },
  lineClamp: {
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  }
})


interface ITodoItemProps {
  todo: Todo,
}

const TodoItem: React.FunctionComponent<ITodoItemProps> = ({ todo }) => {
  const classes = useStyles(todo)
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateTodoInfo = { ...todo, completed: e.target.checked }
    dispatch(updateTodo(updateTodoInfo));
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(deleteTodo(todo.id));
  }

  return (
    <div>
      <Card sx={{ minWidth: 275, }} className={classes.todoCard}>
        <Link to={`/todo/${todo.id}`} style={{ textDecoration: 'none' }}>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography color="text.primary" variant="h5" component="div" className={classes.todoText} style={{
                width: '230px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {todo.title}
              </Typography>
            </div>
            <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
              {formatTime(todo.createdAt)}
            </Typography>
            <div style={{ height: '48px' }}>

              <Typography color={todo.notes ? 'secondary' : '#BBC0C5'} className={classes.todoText + ' ' + classes.lineClamp}>
                {todo.notes ? todo.notes : <span>No Notes</span>}
              </Typography>
            </div>
          </CardContent>
        </Link>
        <CardActions style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px', paddingRight: '10px' }}>
          <FormControlLabel control={<Checkbox name="completed" onChange={handleChange} checked={todo.completed} color="success" size="medium" />} label="Completed" />
          <Typography variant="body2" color={todo.subtasks.length && !todo.completed ? '#2196F3' : '#BBC0C5'} className={classes.todoText}>{todo.subtasks.length ? `(${todo.subtasks.length}) Subtasks` : 'No Subtasks'}</Typography>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default TodoItem;
