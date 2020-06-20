import React, { FC, Fragment, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import TaskListHeader from '../../components/organisms/TaskListHeader'
import TaskListBody from '../../components/organisms/TaskListBody'
import Spinner from '../../components/atoms/Spinner'
import AuthContainer from '../../containers/auth-container'
import TaskListContainer from '../../containers/task-list-container'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
)

const IndexPage: FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const authContainer = AuthContainer.useContainer()
  const taskListContainer = TaskListContainer.useContainer()

  useEffect(() => {
    localStorage.setItem('signedIn.backPath', router.asPath)
    if (!authContainer.isSignedIn()) {
      Router.push('/users/sign_in')
    }
  }, [])

  useEffect(() => {
    const params = {}
    if (router.query.page) {
      params['page'] = router.query.page
    }
    if (router.query.per_page) {
      params['perPage'] = router.query.per_page
    }
    taskListContainer.fetchTasks(params)
  }, [router.query])

  return (
    <Fragment>
      <Head>
        <title>Tasks - Todo</title>
      </Head>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="sm">
          <TaskListHeader />
          <TaskListBody />
          {taskListContainer.isFetching && (
            <Fragment>
              <Spinner />
            </Fragment>
          )}
          <Fab
            color="primary"
            className={classes.fab}
            onClick={() => Router.push('/tasks/new')}
          >
            <Icon className="fas fa-plus" />
          </Fab>
        </Container>
      </div>
    </Fragment>
  )
}

export default IndexPage
