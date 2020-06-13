import React, { FC, Fragment } from 'react'
import Router from 'next/router'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'
import AuthContainer from '../../containers/auth-container'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  })
)

const DrawerContent: FC = () => {
  const classes = useStyles()
  const authContainer = AuthContainer.useContainer()

  return (
    <Fragment>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key="Home" onClick={() => Router.push('/')}>
          <ListItemIcon>
            <Icon className="fas fa-home" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="Tasks" onClick={() => Router.push('/tasks')}>
          <ListItemIcon>
            <Icon className="fas fa-list" />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {!authContainer.isSignedIn() && (
          <ListItem
            button
            key="Sign in"
            onClick={() => Router.push('/users/sign_in')}
          >
            <ListItemIcon>
              <Icon className="fas fa-sign-in-alt" />
            </ListItemIcon>
            <ListItemText primary="Sign in" />
          </ListItem>
        )}
        {authContainer.isSignedIn() && (
          <ListItem
            button
            key="Sign out"
            onClick={() => {
              authContainer.signOut()
              toast.info('Signed out')
              Router.push('/')
            }}
          >
            <ListItemIcon>
              <Icon className="fas fa-sign-out-alt" />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        )}
      </List>
      <Divider />
    </Fragment>
  )
}

export default DrawerContent
