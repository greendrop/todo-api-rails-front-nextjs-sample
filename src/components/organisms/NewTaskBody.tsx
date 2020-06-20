import React, { FC, Fragment, useState, useEffect } from 'react'
import Router from 'next/router'
import Button from '@material-ui/core/Button'
import { toast } from 'react-toastify'
import TaskCreateContainer from '../../containers/task-create-container'
import TaskFormContainer from '../../containers/task-form-container'
import TaskForm from '../molecules/TaskForm'

const NewTaskBody: FC = () => {
  const [isCreated, setIsCreated] = useState<boolean>(false)
  const taskFormContainer = TaskFormContainer.useContainer()
  const taskCreateContainer = TaskCreateContainer.useContainer()

  useEffect(() => {
    taskFormContainer.clearTaskForm()
  }, [])

  useEffect(() => {
    if (isCreated) {
      setIsCreated(false)
      if (taskCreateContainer.isError) {
        toast.error('Create Failed.')
      } else {
        toast.info('Created Task.')
        Router.push('/tasks/[id]', `/tasks/${taskCreateContainer.task.id}`)
      }
    }
  }, [isCreated])

  return (
    <Fragment>
      <TaskForm />
      <Button
        color="primary"
        disabled={taskFormContainer.hasErrors()}
        onClick={async () => {
          if (taskFormContainer.isValid()) {
            await taskCreateContainer.createTask(taskFormContainer.taskForm)
            setIsCreated(true)
          }
        }}
      >
        Create
      </Button>
    </Fragment>
  )
}

export default NewTaskBody
