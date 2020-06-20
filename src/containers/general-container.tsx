import AuthContainer from '../containers/auth-container'
import TaskListContainer from '../containers/task-list-container'
import TaskDetailContainer from '../containers/task-detail-container'
import TaskCreateContainer from '../containers/task-create-container'
import TaskUpdateContainer from '../containers/task-update-container'
import TaskDeleteContainer from '../containers/task-delete-container'
import TaskFormContainer from '../containers/task-form-container'

const compose = (...containers) => {
  const nest = (containers, children) => {
    if (containers.length > 0) {
      const [first, ...rest] = containers

      return <first.Provider>{nest(rest, children)}</first.Provider>
    }

    return children
  }

  return {
    Provider: ({ children }) => {
      return nest(containers, children)
    },
  }
}

const GeneralContainer = compose(
  AuthContainer,
  TaskListContainer,
  TaskDetailContainer,
  TaskCreateContainer,
  TaskUpdateContainer,
  TaskDeleteContainer,
  TaskFormContainer
)

export default GeneralContainer
