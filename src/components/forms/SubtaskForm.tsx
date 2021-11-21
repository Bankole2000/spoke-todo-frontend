import { FunctionComponent } from "react";
import { TextField, Checkbox, InputAdornment } from "@mui/material";
import { Subtask } from "../../interfaces/TodoInterface";

interface SubTaskFormProps {
  subtask: Subtask,
  index: number
}

const SubTaskForm: FunctionComponent<SubTaskFormProps> = () => {
  return (
    <div>
      {/* value={subtask.title} onChange={(e) => handleSubtaskChange(e, i)} */}
      <TextField
        style={{ margin: '20px 20px' }}
        label="Subtask"
        variant="standard"
        color="secondary"
        name="title"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      ></TextField>
      {/* {i + 1}. */}
    </div>
  );
}

export default SubTaskForm;