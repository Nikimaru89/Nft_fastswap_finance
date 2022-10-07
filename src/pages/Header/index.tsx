import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import MenuBtn from './MenuBtn'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useDispatch, useSelector } from 'react-redux'
import { controlMenu } from '../../redux/action/faceAction'
import { useTranslation } from '../../contexts/Localization'

const Wrapper = styled.div`
  width:95%;
  background:none;
  padding:12px 0px;
  margin:0 auto;
  .MuiAccordionDetails-root{
    padding:20px 0px !important;
  }
`
const Inner = styled.div`
  max-width:686px;
  width:95%;
  margin:0 auto;
  display:flex;
  justify-content:space-between;
`
const MenuLine = styled.div`
  padding:10px 20px;
  cursor:pointer;
  &:hover{
    background: #F2F2F2;
  }
`
const Divider = styled.div`
  width: 100%;
  height: 5px;
  background-color: #566FFE;
  border-radius: 10px;
`

const menuitems = ["Admin", "Overview", "Explore", "Rankings", "Activities", "My Profile", "Minting"]

const Header = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const [isclick, SetIsClick] = useState(false)

  const dispatch = useDispatch()
  const location = useLocation()
  const status = useSelector((state: any) => state.face.menuValue)
  const access = useSelector((state: any) => state.face.adminAccess)

  const Handle = (i: number) => {
    dispatch(controlMenu({ menuValue: i }))
  }

  return (
    <Wrapper>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Inner>
          {access &&
            <Link to="/admin" onClick={() => Handle(0)}>
              <MenuBtn text={t("Admin")} isclicked={location.pathname.includes(menuitems[0].toLowerCase())} />
              {location.pathname.includes(menuitems[0].toLowerCase()) && <Divider style={{ width: 70 }} />}
            </Link>}
          <Link to="/overview" onClick={() => Handle(1)}>
            <MenuBtn text={t("Overview")} isclicked={location.pathname.includes(menuitems[1].toLowerCase())} />
            {location.pathname.includes(menuitems[1].toLowerCase()) && <Divider style={{ width: 95 }} />}
          </Link>
          <Link to="/explore" onClick={() => Handle(2)}>
            <MenuBtn text={t("Explore")} isclicked={location.pathname.includes(menuitems[2].toLowerCase())} />
            {location.pathname.includes(menuitems[2].toLowerCase()) && <Divider style={{ width: 80 }} />}
          </Link>
          <Link to="/rankings" onClick={() => Handle(3)}>
            <MenuBtn text={t("Rankings")} isclicked={location.pathname.includes(menuitems[3].toLowerCase())} />
            {location.pathname.includes(menuitems[3].toLowerCase()) && <Divider style={{ width: 90 }} />}
          </Link>
          <Link to="/activities" onClick={() => Handle(4)}>
            <MenuBtn text={t("Activities")} isclicked={location.pathname.includes(menuitems[4].toLowerCase())} />
            {location.pathname.includes(menuitems[4].toLowerCase()) && <Divider style={{ width: 95 }} />}
          </Link>
          <Link to="/minting" onClick={() => Handle(6)}>
            <MenuBtn text={t("Minting")} isclicked={location.pathname.includes(menuitems[6].toLowerCase())} />
            {location.pathname.includes(menuitems[6].toLowerCase()) && <Divider style={{ width: 85 }} />}
          </Link>
          {!!account && <Link to={`/account/${account}`} onClick={() => Handle(5)}>
            <MenuBtn text={t("My Profile")} isclicked={location.pathname.includes(menuitems[5].toLowerCase())} />
            {location.pathname.includes('account') && location.pathname.split('/')[2] === account && <Divider style={{ width: 105 }} />}
          </Link>}
        </Inner>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'right' }}>
        <Accordion
          expanded={isclick}
          onClick={() => SetIsClick(!isclick)}
          sx={{ width: '100%', border: '1px solid text.main' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "text.main" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color='text.main'>{t(menuitems[status])}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              position: 'absolute',
              border: '1px solid ',
              marginTop: '10px',
              borderRadius: '10px',
              width: '100%',
              background: 'white',
              zIndex: '20'
            }}>
            {menuitems.map((page, index) => {
              if (page === 'Admin' && !access) return (<div key={index}></div>)
              else return (
                page === "My Profile"
                  ?
                  <div key={index}>
                    {!!account && <Link to={`/account/${account}`}>
                      <MenuLine onClick={() => { SetIsClick(false); dispatch(controlMenu({ menuValue: index })) }}>
                        <Typography style={{ color: 'text.main' }}>{t(page)}</Typography>
                      </MenuLine>
                      <br />
                    </Link>}
                  </div>
                  :
                  <Link to={`/${page.toLowerCase()}`} key={index}>
                    <MenuLine onClick={() => { SetIsClick(false); dispatch(controlMenu({ menuValue: index })) }}>
                      <Typography style={{ color: 'text.main' }}>{t(page)}</Typography>
                    </MenuLine>
                    <br />
                  </Link>
              )
            })}
          </AccordionDetails>
        </Accordion>
      </Box>
      {
        isclick ?
          <div
            onClick={() => SetIsClick(false)}
            style={{ position: 'absolute', width: '100%', height: '150vh', top: '0px', left: '0px', background: 'none' }}></div> : <></>
      }
    </Wrapper >
  )
}
export default Header