import { useState, ChangeEvent } from 'react'
import { createContainer } from 'unstated-next'
import { ITaskForm } from '../models/task'

interface IErrors {
  base: string
  title: string
  description: string
  done: string
}

const initialTaskForm: ITaskForm = {
  title: '',
  description: '',
  done: false,
}

const initialErrors: IErrors = {
  base: '',
  title: '',
  description: '',
  done: '',
}

const useTaskForm = () => {
  const [taskForm, setTaskForm] = useState<ITaskForm>(initialTaskForm)
  const [errors, setErrors] = useState<IErrors>(initialErrors)

  const clearTaskForm = () => {
    setTaskForm(initialTaskForm)
  }

  const validateTitle = (title: string | null) => {
    if (!title || title.trim() === '') {
      setErrors((prevState) => {
        return { ...prevState, title: "Title can't be blank" }
      })

      return false
    }

    if (title.length > 255) {
      setErrors((prevState) => {
        return {
          ...prevState,
          title: 'Title is too long (maximum is 255 characters)',
        }
      })

      return false
    }

    setErrors((prevState) => {
      return { ...prevState, title: '' }
    })

    return true
  }

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    const value = event.target.value || ''
    setTaskForm((prevState) => {
      return { ...prevState, title: value }
    })
    validateTitle(value)
  }

  const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    const value = event.target.value || ''
    setTaskForm((prevState) => {
      return { ...prevState, description: value }
    })
  }

  const handleDone = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    const value = event.target.checked || false
    setTaskForm((prevState) => {
      return { ...prevState, done: value }
    })
  }

  const isValid = () => {
    let result = true

    if (!validateTitle(taskForm.title)) {
      result = false
    }

    return result
  }

  const hasErrors = () => {
    for (const key in errors) {
      if (errors[key] !== '') {
        return true
      }
    }

    return false
  }

  return {
    taskForm,
    setTaskForm,
    errors,
    setErrors,
    clearTaskForm,
    handleTitle,
    handleDescription,
    handleDone,
    isValid,
    hasErrors,
  }
}

const TaskFormContainer = createContainer(useTaskForm)

export default TaskFormContainer
