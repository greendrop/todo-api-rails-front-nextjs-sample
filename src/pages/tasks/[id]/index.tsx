import React, { FC, Fragment, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import TaskDetailBody from '../../../components/organisms/TaskDetailBody'
import AuthContainer from '../../../containers/auth-container'

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
    if (router.query.id) {
      localStorage.setItem('signedIn.backPath', router.asPath)
      if (!authContainer.isSignedIn()) {
        Router.push('/users/sign_in')
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
        <TaskDetailBody />
      </div>
    </Fragment>
  )
}

export default IndexPage
