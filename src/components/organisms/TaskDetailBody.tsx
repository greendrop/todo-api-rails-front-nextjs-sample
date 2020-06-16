import React, { FC, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import TaskDetailContainer from '../../containers/task-detail-container'
import TaskDetail from '../molecules/TaskDetail'
import Spinner from '../atoms/Spinner'

const TaskDetailBody: FC = () => {
  const router = useRouter()
  const taskDetailContainer = TaskDetailContainer.useContainer()

  useEffect(() => {
    if (router.query.id) {
      const id = Number(router.query.id.toString())
      taskDetailContainer.fetchTaskById(id)
    }
  }, [router.query.id])

  return (
    <Fragment>
      {!taskDetailContainer.isFetching && (
        <Fragment>
          <TaskDetail task={taskDetailContainer.task} />
        </Fragment>
      )}
      {taskDetailContainer.isFetching && <Spinner />}
    </Fragment>
  )
}

export default TaskDetailBody
