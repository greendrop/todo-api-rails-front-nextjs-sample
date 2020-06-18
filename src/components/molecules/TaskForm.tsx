import React, { FC, Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import TaskFormContainer from '../../containers/task-form-container'

const TaskForm: FC = () => {
  const taskFormContainer = TaskFormContainer.useContainer()

  return (
    <Fragment>
      <TextField
        label="Title"
        margin="normal"
        fullWidth
        required
        value={taskFormContainer.taskForm.title}
        onChange={taskFormContainer.handleTitle}
        error={taskFormContainer.errors.title !== ''}
        helperText={taskFormContainer.errors.title}
      />
      <TextField
        label="Description"
        margin="normal"
        multiline
        rowsMax={4}
        fullWidth
        value={taskFormContainer.taskForm.description}
        onChange={taskFormContainer.handleDescription}
        error={taskFormContainer.errors.description !== ''}
        helperText={taskFormContainer.errors.description}
      />
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={taskFormContainer.taskForm.done}
              onChange={taskFormContainer.handleDone}
            />
          }
          label="Done"
        />
      </FormGroup>
    </Fragment>
  )
}

export default TaskForm
