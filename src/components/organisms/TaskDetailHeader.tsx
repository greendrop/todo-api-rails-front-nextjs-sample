import React, { FC, Fragment } from 'react'
import Router from 'next/router'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const TaskDetailHeader: FC = () => {
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
        <Typography color="textPrimary">Task Detail</Typography>
      </Breadcrumbs>
      <Typography variant="h3">Task Detail</Typography>
    </Fragment>
  )
}

export default TaskDetailHeader
