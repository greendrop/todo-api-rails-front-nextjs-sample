import React, { FC, Fragment } from 'react'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
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
const Custom404Page: FC = () => {
  const classes = useStyles()

  return (
    <Fragment>
      <Head>
        <title>Not Found - Todo</title>
      </Head>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="sm">
          <Typography>Not Found</Typography>
        </Container>
      </div>
    </Fragment>
  )
}

export default Custom404Page
