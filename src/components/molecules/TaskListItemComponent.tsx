import React, { FC } from 'react'
import Router from 'next/router'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { ITask } from '../../models/task'

type Props = {
  task: ITask
}

const TaskListItemComponent: FC<Props> = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{props.task.title}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            Router.push(`/tasks/${props.task.id}`)
          }}
        >
          Detail
        </Button>
      </CardActions>
    </Card>
  )
}

export default TaskListItemComponent
