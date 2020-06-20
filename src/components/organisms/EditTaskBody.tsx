import React, { FC, Fragment, useState, useEffect } from 'react'
import Router from 'next/router'
import Button from '@material-ui/core/Button'
import { toast } from 'react-toastify'
import TaskForm from '../molecules/TaskForm'
import { convertTaskToTaskForm } from '../../models/task'
import TaskDetailContainer from '../../containers/task-detail-container'
import TaskUpdateContainer from '../../containers/task-update-container'
import TaskFormContainer from '../../containers/task-form-container'

const EditTaskBody: FC = () => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const taskDetailContainer = TaskDetailContainer.useContainer()
  const taskFormContainer = TaskFormContainer.useContainer()
  const taskUpdateContainer = TaskUpdateContainer.useContainer()

  useEffect(() => {
    const taskForm = convertTaskToTaskForm(taskDetailContainer.task)
    taskFormContainer.setTaskForm(taskForm)
  }, [taskDetailContainer.task.id])

  useEffect(() => {
    if (isUpdated) {
      setIsUpdated(false)
      if (taskUpdateContainer.isError) {
        toast.error('Update Failed.')
      } else {
        toast.info('Updated Task.')
        Router.push('/tasks/[id]', `/tasks/${taskDetailContainer.task.id}`)
      }
    }
  }, [isUpdated])

  return (
    <Fragment>
      <TaskForm />
      <Button
        color="primary"
        disabled={taskFormContainer.hasErrors()}
        onClick={async () => {
          if (taskFormContainer.isValid()) {
            await taskUpdateContainer.updateTask(
              taskDetailContainer.task.id,
              taskFormContainer.taskForm
            )
            setIsUpdated(true)
          }
        }}
      >
        Update
      </Button>
    </Fragment>
  )
}

export default EditTaskBody
