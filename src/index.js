import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyle } from './theme'
import LocalStorageContextProvider, { Updater as LocalStorageContextUpdater } from './contexts/LocalStorage'
import Providers from './Providers'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'

function ContextProviders({ children }) {
  return (
    <LocalStorageContextProvider>
      {children}
    </LocalStorageContextProvider>
  )
}

function Updaters() {
  return (
    <>
      <LocalStorageContextUpdater />
    </>
  )
}

ReactDOM.render(
  <ContextProviders>
    <Provider store={store}>
      <Providers>
        <Updaters />
        <GlobalStyle />
        <App />
      </Providers>
    </Provider>
  </ContextProviders>,
  document.getElementById('root')
)
