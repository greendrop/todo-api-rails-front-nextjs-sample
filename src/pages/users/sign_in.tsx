import React, { FC, Fragment, useEffect } from 'react'
import Head from 'next/head'
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

const SignInPage: FC = () => {
  const classes = useStyles()
  const authContainer = AuthContainer.useContainer()

  useEffect(() => {
    location.href = authContainer.getAuthorizationUrl()
  }, [])

  return (
    <Fragment>
      <Head>
        <title>Sign in - Todo</title>
      </Head>
      <div className={classes.content}>
        <div className={classes.toolbar} />
      </div>
    </Fragment>
  )
}

export default SignInPage
