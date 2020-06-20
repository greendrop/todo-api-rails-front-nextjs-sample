import React, { FC, Fragment, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import EditTaskHeader from '../../../components/organisms/EditTaskHeader'
import EditTaskBody from '../../../components/organisms/EditTaskBody'
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

const EditPage: FC = () => {
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
        <title>Edit Task - Todo</title>
      </Head>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="sm">
          {!taskDetailContainer.isFetching && (
            <Fragment>
              <EditTaskHeader />
              <EditTaskBody />
            </Fragment>
          )}
          {taskDetailContainer.isFetching && <Fragment />}
        </Container>
      </div>
    </Fragment>
  )
}

export default EditPage
