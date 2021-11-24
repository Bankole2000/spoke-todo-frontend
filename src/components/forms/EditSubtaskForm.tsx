import * as React from 'react';
import { TextField, Checkbox, FormControlLabel, IconButton, Tooltip } from "@mui/material";
import { Add as AddIcon, Clear as ClearIcon, } from '@mui/icons-material';
import { Subtask } from "../../interfaces/TodoInterface";

interface IEditSubtaskFormProps {
  i: number,
  task: Subtask,
  itemSubtasks: Subtask[],
  addSubtask(): void,
  handleSubtaskChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number): void,
  markSubtaskAsDone(e: React.ChangeEvent<HTMLInputElement>, i: number): void,
  removeSubtask(i: number): void
}

const EditSubtaskForm: React.FunctionComponent<IEditSubtaskFormProps> = ({ i, itemSubtasks, task, handleSubtaskChange, removeSubtask, addSubtask, markSubtaskAsDone }) => {
  return (
    <li key={i} style={{ fontSize: '24px', margin: '20px auto' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField fullWidth onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" && i === itemSubtasks.length - 1) {
            e.preventDefault();
            addSubtask()
          }
        }} value={task.title} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleSubtaskChange(e, i)} inputProps={{ style: { fontSize: 20, textDecoration: `${task.completed ? 'line-through #313131' : 'none'}` } }} variant="standard" name="title"></TextField>
        <Tooltip title="Mark as done" placement="top" arrow>
          <FormControlLabel control={<Checkbox name="completed" disabled={!Boolean(task.title)} checked={task.completed} onChange={(e) => markSubtaskAsDone(e, i)} color="success" size="medium" />} label="Done" />
        </Tooltip>
        {itemSubtasks.length > 1 &&
          <Tooltip title="Remove subtask" placement="top" arrow>
            <IconButton color="error" onClick={() => removeSubtask(i)}>
              <ClearIcon></ClearIcon>
            </IconButton>
          </Tooltip>
        }
        {i === itemSubtasks.length - 1 &&
          <Tooltip title="Add subtask" placement="top" arrow>
            <IconButton disabled={!Boolean(task.title)} onClick={addSubtask} color="info">
              <AddIcon></AddIcon>
            </IconButton>
          </Tooltip>
        }
      </div>
    </li>
  );
};

export default EditSubtaskForm;
