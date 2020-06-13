import React, { FC, Fragment, useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import AppBarAndDrawer from './AppBarAndDrawer'
import AuthContainer from '../../containers/auth-container'
import { IOAuth2Token } from '../../models/oauth2-token'
import { IUser } from '../../models/user'

const AppContent: FC<AppProps> = (props) => {
  const { Component, pageProps } = props
  const [isLoadedStorage, setIsLoadedStorage] = useState<boolean>(false)
  const [isFetchedToken, setIsFetchedToken] = useState<boolean>(false)
  const [isReady, setIsReady] = useState<boolean>(false)
  const authContainer = AuthContainer.useContainer()

  useEffect(() => {
    const f = async () => {
      let json = localStorage.getItem('authContainer.token')
      if (json && json != '') {
        const data = JSON.parse(json)
        const token: IOAuth2Token = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          createdAt: data.createdAt ? new Date(data.createdAt) : null,
          expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        }
        authContainer.setToken(token)
      }

      json = localStorage.getItem('authContainer.user')
      if (json && json !== '') {
        const data = JSON.parse(json)
        const user: IUser = {
          id: data.id,
          email: data.email,
          createdAt: data.createdAt ? new Date(data.createdAt) : null,
          updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
        }
        authContainer.setUser(user)
      }

      setIsLoadedStorage(true)
    }
    f()
  }, [])

  useEffect(() => {
    if (isLoadedStorage) {
      const f = async () => {
        if (authContainer.token.refreshToken !== '') {
          await authContainer.fetchTokenByRefreshToken(
            authContainer.token.refreshToken
          )
        }
        setIsFetchedToken(true)
      }
      f()
    }
  }, [isLoadedStorage])

  useEffect(() => {
    if (isLoadedStorage && isFetchedToken) {
      setIsReady(true)
    }
  }, [isLoadedStorage, isFetchedToken])

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
    if (isReady) {
      localStorage.setItem(
        'authContainer.token',
        JSON.stringify(authContainer.token)
      )
    }
  }, [authContainer.token])

  useEffect(() => {
    if (isReady) {
      localStorage.setItem(
        'authContainer.user',
        JSON.stringify(authContainer.user)
      )
    }
  }, [authContainer.user])

  return (
    <Fragment>
      <AppBarAndDrawer />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default AppContent
