import React, { FC, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

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

  useEffect(() => {
    localStorage.setItem('signedIn.path', router.asPath)
  }, [])

  return (
    <Fragment>
      <Head>
        <title>Home - Todo</title>
      </Head>
      <div className={classes.content}>
        <div className={classes.toolbar} />
      </div>
    </Fragment>
  )
}

export default IndexPage
