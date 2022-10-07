import React, { useState } from 'react'
import { Box, Tabs, Tab, Typography } from '@mui/material'
import styled from 'styled-components'
import Notification from './Notification'
import Support from './Support'
import Offers from './Offers'
import Profile from './Profile'
import { useTranslation } from '../../contexts/Localization'

const Divider = styled.div`
  width: 100%;
  height: 0px;
  border-bottom: 1px solid #CECECE;
`

const Wrapper = styled.div`
  max-width:1350px;
  width:95%;
  margin:0 auto;
  .MuiTabs-indicator{
    height:4px;
    margin-bottom:5px;
  }
   .MuiTabs-scroller{
    overflow-x:auto !important;
  }
`

const Space = styled.div`
  margin-bottom:40px;
`

const MyTab = styled(Tab)`
  text-transform: none !important;
  margin-right: 32px !important;
  padding: 0px !important;
  min-width: auto !important;
`

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const SettingHeader = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Wrapper>
      <Space />
      <Typography variant='h4' color='text.main'>{t('Settings')}</Typography>
      <Space />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <MyTab label={t("Profile")} {...a11yProps(0)} sx={{ color: 'text.main' }} />
          <MyTab label={t("Notification")} {...a11yProps(1)} sx={{ color: 'text.main' }} />
          <MyTab label={t("Offers")} {...a11yProps(2)} sx={{ color: 'text.main' }} />
          <MyTab label={t("Support")} {...a11yProps(3)} sx={{ color: 'text.main' }} />
        </Tabs>
      </Box>
      <Divider />
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Notification />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Offers />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Support />
      </TabPanel>
    </Wrapper>
  )
}
export default SettingHeader