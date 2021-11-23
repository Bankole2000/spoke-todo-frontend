import { Button, TextField, Checkbox, Collapse, FormControlLabel, IconButton, Backdrop, LinearProgress, Typography, Alert, CircularProgress } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { FunctionComponent, useEffect, useState } from "react";
import { Create as CreateIcon, ArrowBack as ArrowBackIcon, Add as AddIcon, Send as SendIcon } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group';
import { Link, useMatch } from 'react-location';
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from '../redux/actions/todoActions';
import { Subtask, Todo } from "../interfaces/TodoInterface";
import { RootState } from '../redux/reducers';
import config from '../utils/config';
import { formatTime } from '../utils/helpers';
import EditSubtaskForm from "../components/forms/EditSubtaskForm";
import EditTodoAlerts from "../components/common/EditTodoAlerts";


const TodoDetailsPage: FunctionComponent = () => {

  const dispatch = useDispatch();

  // Redux State
  const loading: boolean = useSelector((state: RootState) => state.todos["loading"]);
  const errors: string[] = useSelector((state: RootState) => state.todos["errors"]);

  // Local State
  const [localLoading, setLocalLoading] = useState(false)
  const [localError, setLocalError] = useState("")
  const [editingTitle, setEditingTitle] = useState(false)
  const [editingNotes, setEditingNotes] = useState(false)
  const [hasSubtasks, setHasSubtasks] = useState(false)
  const [todoItem, setTodoItem] = useState<Todo>(
    {
      id: '',
      title: '',
      notes: '',
      subtasks: [],
      completed: false,
    })
  const [itemSubtasks, setItemSubtasks] = useState<Subtask[]>([])
  const [needsUpdate, setNeedsUpdate] = useState(false)

  // Route Params
  const params = useMatch().params;

  // Handle Title and Notes inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTodoItem(
      {
        ...todoItem,
        [e.target.name]: e.target.value
      }
    )
    if (!needsUpdate) setNeedsUpdate(true);
    if (e.target.name === "title") {
      if (todoItem.title.trim() && localError) {
        setLocalError("");
      }
    }
  }

  // Update todo on enter key (title & notes inputs)
  const submitIfEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!todoItem.title.trim()) {
        setLocalError("Todo Title is required");
        return;
      }
      if (editingTitle) setEditingTitle(false);
      if (editingNotes) setEditingNotes(false);
      if (needsUpdate) {
        saveTodo();
      }
    }
  }

  // Update todo on valid inputs
  const saveTodo = () => {
    setLocalError("");
    let updatedTodoInfo = { ...todoItem }
    updatedTodoInfo.title = updatedTodoInfo.title.trim()
    if (!updatedTodoInfo.title) {
      setLocalError("Todo Title is required");
      return;
    }
    if (hasSubtasks) {
      updatedTodoInfo.subtasks = itemSubtasks
    } else {
      updatedTodoInfo.subtasks = [];
    }
    setTodoItem({
      ...updatedTodoInfo
    })

    dispatch(updateTodo(updatedTodoInfo))
    setEditingTitle(false)
    setEditingNotes(false)
    setNeedsUpdate(false);
  }

  const handleSubtaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
    if (!needsUpdate) setNeedsUpdate(true);
    setItemSubtasks(
      itemSubtasks.map((task, j) => {
        if (i === j) {
          return { ...task, [e.target.name]: e.target.value }
        } else {
          return task
        }
      })
    )
  }

  const markSubtaskAsDone = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    if (!needsUpdate) setNeedsUpdate(true);
    setItemSubtasks(
      itemSubtasks.map((task, j) => {
        if (j === i) {
          task.completed = e.target.checked
        }
        return task
      })
    )
  }

  const markTaskAsDone = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!needsUpdate) setNeedsUpdate(true);
    setTodoItem({
      ...todoItem,
      completed: e.target.checked
    })
  }
  const removeSubtask = (i: number) => {
    if (!needsUpdate) setNeedsUpdate(true);
    setItemSubtasks(
      itemSubtasks.filter((_task, j) => j !== i)
    )
  }

  const addSubtask = () => {
    if (!needsUpdate) setNeedsUpdate(true);
    setItemSubtasks(
      [
        ...itemSubtasks,
        {
          title: '',
          completed: false,
        }
      ]
    )
  }

  const toggleHasSubtasks = () => {
    if (!needsUpdate) setNeedsUpdate(true);
    if (hasSubtasks) {
      setHasSubtasks(false)
      setItemSubtasks([])
    } else {
      setHasSubtasks(true)
      setItemSubtasks([
        { title: '', completed: false }
      ])
    }
  }

  useEffect(() => {
    setLocalLoading(true);
    fetch(`${config.baseUrl}/api/todos/${params.id}`)
      .then(res => res.json())
      .then(data => {
        let { data: todoData, success, message } = data;
        if (success) {
          setTodoItem(todoData);
          if (todoData.subtasks.length) {
            setHasSubtasks(true);
            setItemSubtasks(todoData.subtasks)
          }
        } else {
          setLocalError(message)
        }
        setLocalLoading(false);
      })
      .catch(e => {

        setLocalError(e.message)
        setLocalLoading(false);
      })
  }, [params.id])

  return (
    <>
      {(loading || localLoading) && <LinearProgress />}
      <div style={{ maxWidth: '80vw', margin: '0px auto' }}>

        {/* Title Editing */}
        <div style={{ marginTop: '40px' }}>
          <EditTodoAlerts saveTodo={saveTodo} setEditingTitle={setEditingTitle} todoItem={todoItem} errors={errors} loading={loading} needsUpdate={needsUpdate} editingTitle={editingTitle} localError={localError} />

          <Collapse in={editingTitle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField onKeyPress={submitIfEnter} label="Title" value={todoItem.title} inputProps={{ style: { fontSize: 30 } }} fullWidth color="secondary" name="title" onChange={handleChange}></TextField>
              <IconButton disabled={!todoItem.title || !needsUpdate} onClick={saveTodo} size="large" sx={{ ml: 1 }}>
                <SendIcon color={todoItem.title && needsUpdate ? "primary" : "disabled"}></SendIcon>
              </IconButton>
            </div>
          </Collapse>
          <hr />
        </div>
        <Typography variant="body2" sx={{ mb: 0 }} color="text.secondary">
          {formatTime(todoItem.createdAt ? todoItem.createdAt : Date.now())}
        </Typography>

        {/* Notes Editing */}
        <div style={{ margin: '20px auto' }}>
          <Collapse in={!editingNotes}>
            <div onClick={() => {
              if (!localError) {
                setEditingNotes(true)
              }
            }} style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', cursor: 'pointer' }}>
              <Typography color={todoItem.notes ? 'primary' : '#BBC0C5'} variant="h5" component="div">
                {todoItem.notes ? todoItem.notes : 'No Notes for this todo item.'}
              </Typography>
              <IconButton disabled={Boolean(localError)} size="large" onClick={() => setEditingNotes(true)}>
                {todoItem.notes ? (<CreateIcon></CreateIcon>) : (<AddIcon color="info"></AddIcon>)}
              </IconButton>
            </div>
          </Collapse>
          <Collapse in={editingNotes}>
            <TextField multiline rows={3} placeholder={`Add notes to "${todoItem.title}"`} onKeyPress={submitIfEnter} label="Notes" value={todoItem.notes} inputProps={{ style: { fontSize: 20 } }} fullWidth color="secondary" name="notes" onChange={handleChange}></TextField>
          </Collapse>
        </div>

        {/* Mark as complete */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}></div>
          <FormControlLabel control={<Checkbox name="completed" disabled={!Boolean(todoItem.title)} checked={todoItem.completed} onChange={markTaskAsDone} color="success" size="medium" />} label="Mark as completed" />
        </div>

        {/* Subtasks Editing */}
        <div>
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <h2 style={{ margin: '10px' }}>Subtasks {itemSubtasks.length ? (<span style={{ fontWeight: 'lighter' }}>({itemSubtasks.length})</span>) : ("")}</h2>
            <div style={{ flexGrow: 1 }}></div>
            <Button variant="outlined" disabled={!Boolean(todoItem.title)} onClick={() => toggleHasSubtasks()}>{hasSubtasks ? 'Remove' : 'Add'} Tasks</Button>
          </div>
          <hr />
          <div>
            <Collapse in={Boolean(itemSubtasks.length)}>
              <ol>
                <TransitionGroup>
                  {itemSubtasks.map((task, i) => (
                    <Collapse key={i}>
                      <EditSubtaskForm i={i} task={task} itemSubtasks={itemSubtasks} addSubtask={addSubtask} handleSubtaskChange={handleSubtaskChange} markSubtaskAsDone={markSubtaskAsDone} removeSubtask={removeSubtask}></EditSubtaskForm>
                    </Collapse>
                  ))}
                </TransitionGroup>
              </ol>
            </Collapse>
            <Collapse in={!Boolean(itemSubtasks.length)} sx={{ mb: 2 }}>
              <Alert severity="info">
                This todo has no subtasks
              </Alert>
            </Collapse>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button size="large" color="secondary" startIcon={<ArrowBackIcon />}>Back</Button>
          </Link>
          <div style={{ flexGrow: 1 }}></div>
          <LoadingButton loadingPosition="end" loading={loading} size="large" variant="contained" onClick={saveTodo} disabled={!needsUpdate || !Boolean(todoItem.title.trim())} color="primary" endIcon={<SendIcon style={{ color: 'white' }} />}>
            <span style={{ color: 'white' }}>Save </span>
          </LoadingButton>
        </div>
      </div >
      <Backdrop open={loading || localLoading} invisible>
        <CircularProgress color="primary"></CircularProgress>
      </Backdrop>
    </>
  );
}

export default TodoDetailsPage;