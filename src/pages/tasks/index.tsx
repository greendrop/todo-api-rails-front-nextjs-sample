import React, { FC, Fragment, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AuthContainer from '../../containers/auth-container'
import TaskListBody from '../../components/organisms/TaskListBody'

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

  useEffect(() => {
    localStorage.setItem('signedIn.backPath', router.asPath)
    if (!authContainer.isSignedIn()) {
      Router.push('/users/sign_in')
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
          <Typography variant="h3">Tasks</Typography>
          <TaskListBody />
        </Container>
      </div>
    </Fragment>
  )
}

export default IndexPage
