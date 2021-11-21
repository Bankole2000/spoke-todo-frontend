import { Button, TextField, Checkbox, Collapse, FormControlLabel, InputAdornment, IconButton, Backdrop, CircularProgress } from "@mui/material";
import { Send as SendIcon, Add as AddIcon, Clear as ClearIcon } from '@mui/icons-material';
import { FunctionComponent, useState } from "react";
import { TransitionGroup } from 'react-transition-group';
import { Subtask, Todo } from "../../interfaces/TodoInterface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

import { createTodo, getTodos } from '../../redux/actions/todoActions';



interface TodoFormProps {

}

const TodoForm: FunctionComponent<TodoFormProps> = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos["todos"])
  const loading = useSelector((state: RootState) => state.todos["loading"])
  const [newTodo, setNewTodo] = useState<Todo>({
    title: '',
    notes: '',
    completed: false,
    subtasks: []
  })
  let [hasSubtasks, sethasSubtasks] = useState(false);
  const [subTasks, setsubTasks] = useState<Subtask[]>([
    {
      title: '',
      completed: false,
    }
  ])
  const toggleHasSubtasks = () => {
    sethasSubtasks(!hasSubtasks);
    if (!hasSubtasks) {
      setsubTasks([
        {
          title: '',
          completed: false,
        }
      ])
    }
  }

  const addSubtask = () => {
    const newSubtask: Subtask = { title: '', completed: false }
    setsubTasks([
      ...subTasks,
      newSubtask
    ])
  }
  const removeSubtask = (i: number) => {
    const filteredSubtasks = subTasks.filter((task, index) => index !== i);
    setsubTasks(filteredSubtasks);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e.target.value)
    setNewTodo(
      {
        ...newTodo,
        [e.target.name]: e.target.value
      }
    )
  }
  const handleSubtaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
    console.log(e.target.value, i)
    setsubTasks(subTasks.map((task, index) =>
      index == i
        ? { ...task, [e.target.name]: e.target.value }
        : task
    ));
  }
  const markAsCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(
      {
        ...newTodo,
        completed: e.target.checked
      }
    )
  }

  const addTodo = () => {
    if (hasSubtasks) {
      newTodo.subtasks = subTasks
    }
    console.log({ newTodo })
    dispatch(createTodo(newTodo))
    setNewTodo(
      {
        title: '',
        notes: '',
        completed: false,
        subtasks: []
      }
    )
    sethasSubtasks(false)
    setsubTasks([
      {
        title: '',
        completed: false,
      }
    ])
    console.log({todos})
  }

  const submitIfEnter = (e : React.KeyboardEvent<HTMLDivElement>) => {
    console.log({key: e.key})
    if(e.key == 'Enter'){
      addTodo();
    }
  }
  return (
    <div style={{ width: '80vw', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px auto', position: 'relative' }}>
      <TextField
        style={{ margin: '20px 20px' }}
        label="Add A Todo"
        onKeyPress={submitIfEnter}
        variant="outlined"
        color="secondary"
        name="title" value={newTodo.title} onChange={handleChange}
        fullWidth
        required
      ></TextField>
      <Collapse in={Boolean(newTodo.title)} style={{ width: '100%' }}>
        <TextField
          style={{ marginBottom: '10px', width: '100%' }}
          label="Notes"
          value={newTodo.notes}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
          name="notes"
          fullWidth
          multiline
          rows={2}
        ></TextField>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <FormControlLabel control={<Checkbox onChange={markAsCompleted} name="completed" color="success" size="medium" checked={newTodo.completed} />} label="Mark as completed" />
          <div style={{ flexGrow: 1 }}></div>
          <Button onClick={toggleHasSubtasks}>{`${hasSubtasks ? 'Remove' : 'Add'}`} Subtasks</Button>
        </div>
      </Collapse>
      <Collapse in={hasSubtasks} style={{ width: '100%' }}>
        <TransitionGroup>
          {subTasks.map((subtask, i) => (
            <Collapse key={i}>
              <div style={{ display: 'flex', alignItems: 'center' }} key={i}>
                <TextField
                  style={{ margin: '0px 10px 20px' }}
                  label="Subtask"
                  variant="standard"
                  color="secondary"
                  name="title" value={subtask.title} onKeyPress={(e) => {
                    if (e.key == "Enter" && i == subTasks.length - 1) addSubtask()
                  }} 
                  onChange={(e) => handleSubtaskChange(e, i)}
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{i + 1}.</InputAdornment>,
                  }}
                ></TextField>
                {subTasks.length > 1 && <IconButton onClick={() => removeSubtask(i)} color="error">
                  <ClearIcon></ClearIcon>
                </IconButton>}
                {i === subTasks.length - 1 &&
                  <IconButton disabled={!Boolean(subtask.title)} onClick={addSubtask} color="info">
                    <AddIcon></AddIcon>
                  </IconButton>
                }
              </div>
            </Collapse>
          ))}
        </TransitionGroup>
      </Collapse>

      <Button onClick={addTodo} fullWidth size="large" variant="contained" disabled={!Boolean(newTodo.title)} color="primary" endIcon={<SendIcon style={{ color: 'white' }} />}><span style={{ color: 'white' }}>Save </span></Button>
      <Backdrop
        sx={{ color: (theme) => theme.palette.primary.main, zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }}
        open={loading}
        invisible
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* {JSON.stringify(todos)}
      <hr />
      {JSON.stringify(loading)} */}
    </div>
  );
}

export default TodoForm;