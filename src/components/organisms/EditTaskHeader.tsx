import React, { FC, Fragment } from 'react'
import Router from 'next/router'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import TaskDetailContainer from '../../containers/task-detail-container'

const EditTaskHeader: FC = () => {
  const taskDetailContainer = TaskDetailContainer.useContainer()

  return (
    <Fragment>
      <Breadcrumbs>
        <Link
          color="inherit"
          href="/tasks"
          onClick={(event) => {
            event.preventDefault()
            Router.push('/tasks')
          }}
        >
          Tasks
        </Link>
        <Link
          color="inherit"
          href={`/tasks/${taskDetailContainer.task.id}`}
          onClick={(event) => {
            event.preventDefault()
            Router.push('/tasks/[id]', `/tasks/${taskDetailContainer.task.id}`)
          }}
        >
          Task Detail
        </Link>
        <Typography color="textPrimary">Edit Task</Typography>
      </Breadcrumbs>
      <Typography variant="h3">Edit Task</Typography>
    </Fragment>
  )
}

export default EditTaskHeader
