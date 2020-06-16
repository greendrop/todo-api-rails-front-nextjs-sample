import React, { FC, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import TaskListContainer from '../../containers/task-list-container'
import TaskListItem from '../molecules/TaskListItem'
import Spinner from '../atoms/Spinner'

const TaskListBody: FC = () => {
  const router = useRouter()
  const taskListContainer = TaskListContainer.useContainer()

  useEffect(() => {
    const params = {
      page: router.query.page,
      perPage: router.query.page,
    }
    taskListContainer.fetchTasks(params)
  }, [])

  return (
    <Fragment>
      {taskListContainer.tasks.map((task) => {
        return <TaskListItem key={task.id} task={task} />
      })}
      {taskListContainer.isFetching && <Spinner />}
    </Fragment>
  )
}

export default TaskListBody
