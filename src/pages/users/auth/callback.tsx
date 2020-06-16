import React, { FC, Fragment, useEffect } from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'
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

const CallbackPage: FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const authContainer = AuthContainer.useContainer()

  useEffect(() => {
    const f = async () => {
      if (router.query.code && router.query.code.toString() !== '') {
        authContainer.fetchTokenAndUserByCode(router.query.code.toString())
      }
    }
    f()
  }, [router.query.code])

  useEffect(() => {
    if (authContainer.isSignedIn()) {
      toast.info('Signed in')
      const backPath = localStorage.getItem('signedIn.backPath')
      if (backPath && backPath !== '') {
        Router.push(backPath)
      } else {
        Router.push('/')
      }
    }
  }, [authContainer.isSignedIn()])

  return (
    <Fragment>
      <Head>
        <title>Callback - Todo</title>
      </Head>
      <div className={classes.content}>
        <div className={classes.toolbar} />
      </div>
    </Fragment>
  )
}

export default CallbackPage
