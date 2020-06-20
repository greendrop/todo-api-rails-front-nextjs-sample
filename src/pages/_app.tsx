import React, { Fragment, useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../themes/default'
import { ToastContainer } from 'react-toastify'
import AuthContainer from '../containers/auth-container'
import TaskListContainer from '../containers/task-list-container'
import TaskDetailContainer from '../containers/task-detail-container'
import TaskCreateContainer from '../containers/task-create-container'
import TaskUpdateContainer from '../containers/task-update-container'
import TaskFormContainer from '../containers/task-form-container'
import AppContent from '../components/organisms/AppContent'

import 'react-toastify/dist/ReactToastify.css'

export default function MyApp(props: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <Fragment>
      <Head>
        <title>Todo</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <AuthContainer.Provider>
            <TaskListContainer.Provider>
              <TaskDetailContainer.Provider>
                <TaskCreateContainer.Provider>
                  <TaskUpdateContainer.Provider>
                    <TaskFormContainer.Provider>
                      <AppContent {...props} />
                    </TaskFormContainer.Provider>
                  </TaskUpdateContainer.Provider>
                </TaskCreateContainer.Provider>
              </TaskDetailContainer.Provider>
            </TaskListContainer.Provider>
          </AuthContainer.Provider>
        </div>
      </ThemeProvider>
      <ToastContainer />
    </Fragment>
  )
}
