import React, { FC, Fragment } from 'react'
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
