import React from 'react'
import styled, { useTheme } from 'styled-components'
import { ThemeProvider } from '@mui/material/styles'
import { light, dark } from './theme'
import { useWeb3React } from '@web3-react/core'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { Progress, Snackbar, Validation } from './components'
import { ToastContainer } from 'react-toastify'
import { LanguageProvider } from '../src/contexts/Localization'
import MenuWrapper from './components/MenuWrapper'
import PrivateRoute from './components/Routes'
import Activity from './pages/Activity'
import Admin from './pages/Admin'
import CreateNft from './pages/CreateNft'
import Collection from './pages/Collection'
import CollectionSet from './pages/CollectionSet'
import Explore from './pages/Explore'
import Header from './pages/Header'
import Landing from './pages/Landing'
import NftDetails from './pages/NftDetails'
import Mint from './pages/Mint'
import Profile from './pages/Profile'
import Ranking from './pages/Ranking'
import Setting from './pages/Setting'

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
`

function App() {
  const { account } = useWeb3React()
  const { isDark } = useTheme()
  const theme = isDark ? dark : light

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <LanguageProvider>
          <BrowserRouter>
            <MenuWrapper>
              <div style={{ background: theme.palette.background.main }}>
                <Header />
                <Progress />
                <Snackbar />
                <Validation />
                <ToastContainer />
                <Routes>
                  <Route exacts strict path='/admin' element={<PrivateRoute><Admin /></PrivateRoute>} />
                  <Route exacts strict path="/overview" element={<Landing />} />
                  <Route exacts strict path="/explore" element={<Explore />} />
                  <Route exacts strict path="/rankings" element={<Ranking />} />
                  <Route exacts strict path="/minting" element={<Mint />} />
                  <Route exacts strict path="/activities" element={<Activity />} />
                  <Route exacts strict path="/collection/:contract/:name" element={<Collection />} />
                  {!!account && <Route exacts strict path="/account/:address" element={<Profile />} />}
                  <Route exacts strict path='/create' element={<CreateNft />} />
                  <Route exacts strict path='/edit/:contract/:tokenId' element={<CreateNft />} />
                  <Route exacts strict path='/add' element={<CollectionSet />} />
                  <Route exacts strict path='/setting' element={<Setting />} />
                  <Route exacts strict path='/assets/:contract/:tokenId' element={<NftDetails />} />
                  <Route exacts strict path='/' element={<Navigate replace to="/overview" />} />
                </Routes>
              </div>
            </MenuWrapper>
          </BrowserRouter>
        </LanguageProvider>
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
