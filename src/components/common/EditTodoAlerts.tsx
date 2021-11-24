import * as React from 'react';
import { Collapse, IconButton, Alert, Tooltip } from "@mui/material";
import { Create as CreateIcon, ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-location';

import { Todo } from '../../interfaces/TodoInterface'

interface IEditTodoAlertsProps {
  todoItem: Todo,
  needsUpdate: boolean,
  loading: boolean,
  localError: string,
  errors: string[],
  editingTitle: boolean,
  saveTodo(): void,
  setEditingTitle(i: boolean): void,
}

const EditTodoAlerts: React.FunctionComponent<IEditTodoAlertsProps> = ({ todoItem, needsUpdate, loading, localError, errors, editingTitle, saveTodo, setEditingTitle }) => {
  return (
    <>
      <Collapse in={needsUpdate}>
        <Alert style={{ cursor: "pointer", marginBottom: '20px' }} onClick={saveTodo} severity="warning"
          action={
            <LoadingButton onClick={saveTodo} loading={loading} color="inherit" size="small" loadingPosition="end" endIcon={<SaveIcon />}>
              Save
            </LoadingButton>
          }
        >
          You have unsaved changes
        </Alert>
      </Collapse>
      <Collapse in={Boolean(localError)}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {localError}
        </Alert>
      </Collapse>
      <Collapse in={Boolean(errors.length)}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors[0]}
        </Alert>
      </Collapse>
      <Collapse in={!editingTitle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <IconButton size="large" sx={{ mr: 1 }}>
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
          </Link>
          <h1 style={{ margin: '5px auto', cursor: 'pointer', textDecoration: `${todoItem.completed ? 'line-through #999999' : 'none'}` }} onClick={() => setEditingTitle(true)}>{todoItem ? todoItem.title : ''}</h1>
          <div style={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => setEditingTitle(true)}></div>
          <Tooltip title="Edit to-do title" placement="top" arrow>
            <IconButton disabled={Boolean(localError)} size="large" onClick={() => setEditingTitle(true)}>
              <CreateIcon></CreateIcon>
            </IconButton>
          </Tooltip>
        </div>
      </Collapse>
    </>
  );
};

export default EditTodoAlerts;
