import React, { FC, Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ToastContainer } from 'react-toastify'
import { parseCookies, setCookie } from 'nookies'
import theme from '../themes/default'
import AppBarAndDrawer from '../components/organisms/AppBarAndDrawer'
import AuthContainer from '../containers/auth-container'
import GeneralContainer from '../containers/general-container'
import { IOAuth2Token } from '../models/oauth2-token'
import { IUser } from '../models/user'

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
          <GeneralContainer.Provider>
            <MyAppContent {...props} />
          </GeneralContainer.Provider>
        </div>
      </ThemeProvider>
      <ToastContainer />
    </Fragment>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const cookies = parseCookies(ctx)
  let token: IOAuth2Token = {
    accessToken: '',
    refreshToken: '',
    createdAt: null,
    expiresAt: null,
  }
  let user: IUser = {
    id: 0,
    email: '',
    createdAt: null,
    updatedAt: null,
  }

  let json = cookies['authContainer.token']
  if (json && json != '') {
    const data = JSON.parse(json)
    token = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      createdAt: data.createdAt ? new Date(data.createdAt) : null,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    }
  }

  json = cookies['authContainer.user']
  if (json && json !== '') {
    const data = JSON.parse(json)
    user = {
      id: data.id,
      email: data.email,
      createdAt: data.createdAt ? new Date(data.createdAt) : null,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
    }
  }

  let pageProps = {
    pageProps: {
      auth: {
        token: token,
        user: user,
      },
    },
  }

  if (Component.getInitialProps) {
    const componentPageProps = await Component.getInitialProps(ctx)
    pageProps = {
      ...pageProps,
      ...componentPageProps,
    }
  }

  return pageProps
}

const MyAppContent: FC<AppProps> = (props) => {
  const { Component, pageProps } = props
  const [isReady, setIsReady] = useState<boolean>(false)
  const authContainer = AuthContainer.useContainer()

  useEffect(() => {
    const propToken = pageProps.auth.token
    const propUser = pageProps.auth.user
    authContainer.setToken({
      accessToken: propToken.accessToken,
      refreshToken: propToken.refreshToken,
      createdAt: propToken.createdAt ? new Date(propToken.createdAt) : null,
      expiresAt: propToken.expiresAt ? new Date(propToken.expiresAt) : null,
    })
    authContainer.setUser({
      id: propUser.id,
      email: propUser.email,
      createdAt: propUser.createdAt ? new Date(propUser.createdAt) : null,
      updatedAt: propUser.updatedAt ? new Date(propUser.updatedAt) : null,
    })
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (isReady && authContainer.isNeedRefresh()) {
      const f = async () => {
        if (authContainer.token.refreshToken !== '') {
          await authContainer.fetchTokenByRefreshToken(
            authContainer.token.refreshToken
          )
        }
      }
      f()
    }
  }, [authContainer.isNeedRefresh()])

  useEffect(() => {
    if (isReady && authContainer.isUnauthorized) {
      authContainer.signOut()
    }
  }, [authContainer.isUnauthorized])

  useEffect(() => {
    if (isReady && authContainer.token) {
      setCookie(
        null,
        'authContainer.token',
        JSON.stringify(authContainer.token),
        { path: '/' }
      )
    }
  }, [authContainer.token])

  useEffect(() => {
    if (isReady && authContainer.user) {
      setCookie(
        null,
        'authContainer.user',
        JSON.stringify(authContainer.user),
        { path: '/' }
      )
    }
  }, [authContainer.user])

  return (
    <Fragment>
      {isReady && (
        <Fragment>
          <AppBarAndDrawer />
          <Component {...pageProps} />
        </Fragment>
      )}
    </Fragment>
  )
}
