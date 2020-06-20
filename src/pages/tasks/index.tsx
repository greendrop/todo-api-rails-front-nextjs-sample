import React, { FC, Fragment, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AuthContainer from '../../containers/auth-container'
import TaskListHeader from '../../components/organisms/TaskListHeader'
import TaskListBody from '../../components/organisms/TaskListBody'

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

  useEffect(() => {
    localStorage.setItem('signedIn.backPath', router.asPath)
    if (!authContainer.isSignedIn()) {
      // Router.push('/users/sign_in')
    }
  }, [])

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
