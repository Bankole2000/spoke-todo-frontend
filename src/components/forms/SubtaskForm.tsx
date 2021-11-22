import { FunctionComponent } from "react";
import { TextField, Checkbox, InputAdornment, IconButton } from "@mui/material";
import { Send as SendIcon, Add as AddIcon, Clear as ClearIcon } from '@mui/icons-material';
import { Subtask } from "../../interfaces/TodoInterface";

interface SubTaskFormProps {
  subtask: Subtask,
  i: number, 
  addSubtask(): void, 
  removeSubtask(i: number): void,
  subTasks: Subtask[],
  handleSubtaskChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number): void
}

const SubTaskForm: FunctionComponent<SubTaskFormProps> = ({subtask, i, addSubtask, subTasks, removeSubtask, handleSubtaskChange}) => {
  return (
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
  );
}

export default SubTaskForm;