import React, { FC, Fragment } from 'react'
import Router from 'next/router'
import Button from '@material-ui/core/Button'
import TaskDetailContainer from '../../containers/task-detail-container'
import TaskDetail from '../molecules/TaskDetail'

const TaskDetailBody: FC = () => {
  const taskDetailContainer = TaskDetailContainer.useContainer()

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
    </Fragment>
  )
}

export default TaskDetailBody
