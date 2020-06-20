import React, { FC, Fragment } from 'react'
import Router, { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination'
import TaskListContainer from '../../containers/task-list-container'
import TaskListItem from '../molecules/TaskListItem'

const TaskListBody: FC = () => {
  const taskListContainer = TaskListContainer.useContainer()
  const router = useRouter()

  return (
    <Fragment>
      {taskListContainer.tasks.map((task) => {
        return <TaskListItem key={task.id} task={task} />
      })}
      {taskListContainer.maxPage > 1 && (
        <Grid container justify="center">
          <Grid container item xs={12} justify="center">
            <Pagination
              count={taskListContainer.maxPage}
              page={taskListContainer.page}
              onChange={(event, page) => {
                const query = {
                  page: page,
                }
                if (router.query.per_page) {
                  query['per_page'] = router.query.per_page
                }
                Router.push({
                  pathname: '/tasks',
                  query: query,
                })
              }}
            />
          </Grid>
        </Grid>
      )}
    </Fragment>
  )
}

export default TaskListBody
