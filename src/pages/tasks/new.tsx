import React, { FC, Fragment, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AuthContainer from '../../containers/auth-container'
import NewTaskHeader from '../../components/organisms/NewTaskHeader'
import NewTaskBody from '../../components/organisms/NewTaskBody'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  })
)

const NewPage: FC = () => {
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
        <title>New Task - Todo</title>
      </Head>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="sm">
          <NewTaskHeader />
          <NewTaskBody />
        </Container>
      </div>
    </Fragment>
  )
}

export default NewPage
