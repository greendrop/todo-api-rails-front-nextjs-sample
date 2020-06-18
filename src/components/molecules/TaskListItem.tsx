import React, { FC } from 'react'
import Router from 'next/router'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { ITask } from '../../models/task'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginBottom: theme.spacing(1),
    },
  })
)

type Props = {
  task: ITask
}

const TaskListItem: FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5">{props.task.title}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            Router.push('/tasks/[id]', `/tasks/${props.task.id}`)
          }}
        >
          Detail
        </Button>
      </CardActions>
    </Card>
  )
}

export default TaskListItem
