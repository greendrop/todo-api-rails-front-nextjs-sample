import React, { FC, Fragment, useState, useEffect } from 'react'
import Router from 'next/router'
import Button from '@material-ui/core/Button'
import { toast } from 'react-toastify'
import TaskDetail from '../molecules/TaskDetail'
import TaskDetailContainer from '../../containers/task-detail-container'
import TaskDeleteContainer from '../../containers/task-delete-container'

const TaskDetailBody: FC = () => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false)
  const taskDetailContainer = TaskDetailContainer.useContainer()
  const taskDeleteContainer = TaskDeleteContainer.useContainer()

  useEffect(() => {
    if (isDeleted) {
      setIsDeleted(false)
      if (taskDeleteContainer.isError) {
        toast.error('Delete Failed.')
      } else {
        toast.info('Deleted Task.')
        Router.push('/tasks')
      }
    }
  }, [isDeleted])

  return (
    <Fragment>
      <TaskDetail task={taskDetailContainer.task} />
      <Button
        onClick={async () =>
          Router.push(
            '/tasks/[id]/edit',
            `/tasks/${taskDetailContainer.task.id}/edit`
          )
        }
      >
        Edit
      </Button>
      <Button
        onClick={async () => {
          if (confirm('Are you sure?')) {
            await taskDeleteContainer.deleteTask(taskDetailContainer.task.id)
            setIsDeleted(true)
          }
        }}
      >
        Delete
      </Button>
    </Fragment>
  )
}

export default TaskDetailBody
