import React, { FC, Fragment, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import TaskDetailHeader from '../../../components/organisms/TaskDetailHeader'
import TaskDetailBody from '../../../components/organisms/TaskDetailBody'
import Spinner from '../../../components/atoms/Spinner'
import AuthContainer from '../../../containers/auth-container'
import TaskDetailContainer from '../../../containers/task-detail-container'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  })
)

const IndexPage: FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const authContainer = AuthContainer.useContainer()
  const taskDetailContainer = TaskDetailContainer.useContainer()

  useEffect(() => {
    if (router.query.id) {
      localStorage.setItem('signedIn.backPath', router.asPath)
      if (!authContainer.isSignedIn()) {
        Router.push('/users/sign_in')
      } else {
        const id = Number(router.query.id.toString())
        taskDetailContainer.fetchTaskById(id)
      }
    }
  }, [router.query.id])

  return (
    <Fragment>
      <Head>
        <title>Task Detail - Todo</title>
      </Head>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="sm">
          {!taskDetailContainer.isFetching && (
            <Fragment>
              <TaskDetailHeader />
              <TaskDetailBody />
            </Fragment>
          )}
          {taskDetailContainer.isFetching && (
            <Fragment>
              <Spinner />
            </Fragment>
          )}
        </Container>
      </div>
    </Fragment>
  )
}

export default IndexPage
