import React, { FC, Fragment, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AuthContainer from '../../containers/auth-container'

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
  const authContainer = AuthContainer.useContainer()

  useEffect(() => {
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
        <Container maxWidth="sm"></Container>
      </div>
    </Fragment>
  )
}

export default IndexPage
