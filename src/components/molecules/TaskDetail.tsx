import React, { FC } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { ITask } from '../../models/task'

type Props = {
  task: ITask
}

const TaskDetail: FC<Props> = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{props.task.title}</Typography>
        <Typography>{props.task.description}</Typography>
        <Typography>{props.task.done}</Typography>
      </CardContent>
    </Card>
  )
}

export default TaskDetail
