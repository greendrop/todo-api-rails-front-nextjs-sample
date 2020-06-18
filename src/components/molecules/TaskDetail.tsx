import React, { FC, Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { ITask } from '../../models/task'
import { datetime } from '../../lib/filters'

type Props = {
  task: ITask
}

const TaskDetail: FC<Props> = (props) => {
  return (
    <Fragment>
      <TextField
        label="Title"
        margin="normal"
        fullWidth
        value={props.task.title}
        inputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Description"
        margin="normal"
        multiline
        fullWidth
        value={props.task.description}
        inputProps={{
          readOnly: true,
        }}
      />
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={props.task.done}
              inputProps={{
                readOnly: true,
              }}
            />
          }
          label="Done"
        />
      </FormGroup>
      <TextField
        label="Created at"
        margin="normal"
        multiline
        fullWidth
        value={datetime(props.task.createdAt)}
        inputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Updated at"
        margin="normal"
        multiline
        fullWidth
        value={datetime(props.task.updatedAt)}
        inputProps={{
          readOnly: true,
        }}
      />
    </Fragment>
  )
}

export default TaskDetail
