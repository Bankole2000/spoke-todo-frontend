import * as React from 'react';
import { Todo } from '../../interfaces/TodoInterface';
import { formatTime } from '../../utils/helpers';
import { Card, CardContent, Typography, CardActions, Button, Box, FormControlLabel, Checkbox, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface ITodoItemProps {
  todo: Todo,
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const TodoItem: React.FunctionComponent<ITodoItemProps> = ({ todo }) => {
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography color="text.primary" variant="h5" component="div">
              {todo.title}
            </Typography>
          </div>
          <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
            {formatTime(todo.createdAt)}
          </Typography>
          <Typography color={todo.notes ? 'secondary' : '#BBC0C5'}>
            {todo.notes ? todo.notes : <span>No Notes</span>}
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px', paddingRight: '10px' }}>
          <FormControlLabel control={<Checkbox name="completed" checked={todo.completed} color="success" size="medium" />} label="Completed" />
          <Typography variant="body2" color={todo.subtasks.length ? '#2196F3' : '#BBC0C5'}>{todo.subtasks.length ? `(${todo.subtasks.length}) Subtasks` : 'No Subtasks'}</Typography>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton color="error">
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default TodoItem;
