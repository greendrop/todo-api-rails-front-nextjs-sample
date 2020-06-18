import React, { FC, Fragment } from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'

const TaskListHeader: FC = () => {
  return (
    <Fragment>
      <Breadcrumbs>
        <Typography color="textPrimary">Tasks</Typography>
      </Breadcrumbs>
      <Typography variant="h3">Tasks</Typography>
    </Fragment>
  )
}

export default TaskListHeader
