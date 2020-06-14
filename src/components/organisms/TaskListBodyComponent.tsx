import React, { FC, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import TaskListContainer from '../../containers/task-list-container'
import TaskListItemComponent from '../molecules/TaskListItemComponent'
import Spinner from '../atoms/Spinner'

const TaskListBodyComponent: FC = () => {
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
        return <TaskListItemComponent key={task.id} task={task} />
      })}
      {taskListContainer.isFetching && <Spinner />}
    </Fragment>
  )
}

export default TaskListBodyComponent
