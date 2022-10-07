import React from "react"
import { useTranslation } from "../../contexts/Localization"
import styled from "styled-components"
import { Box, Button, Tab, Tabs, Typography } from '@mui/material'

const Topnum = styled(Typography)`
  position:absolute;
  top:7px;
  right:0px;
`
const MyBox = styled(Box)`
  .MuiTabs-indicator{
    height:4px;
    margin-bottom:5px;
  }
  .MuiTabs-scroller{
    overflow-x:auto !important;
  }
 
`
const StyledTab = ({ counts, topMenu, addType, filter, setAddType, setFilter, setSpecies, noHead = false }: any) => {
  const { t } = useTranslation()
  const nftType = ['Collected', 'Created', 'On Auction', 'Buy Now', 'Sold']
  const handleChange = (event, newValue) => {
    setAddType(newValue)
    setSpecies(Object.keys(topMenu)[newValue - 1])
  }

  return (
    <MyBox sx={{ width: '100%', typography: 'subtitle2', mt: '68px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs onChange={handleChange} value={addType} aria-label="lab API tabs example" sx={{ overFlow: 'auto' }}>
          {Object.keys(topMenu).map((item, index) => {
            return (
              <Tab
                key={index}
                label={<span>{t(item)}</span>}
                icon={<Topnum variant='caption'>{topMenu[item]}</Topnum>}
                value={(index + 1).toString()}
                sx={{
                  textAlign: 'left',
                  minHeight: '47px !important',
                  textTransform: 'none',
                  mr: '32px',
                  minWidth: '0px !important',
                  padding: '0px 20px !important',
                  paddingLeft: '9px !important',
                  color: 'text.main'
                }} />
            )
          })}
        </Tabs>
      </Box>
      {!noHead && <Box sx={{ width: '100%', typography: 'smbutton', mb: '32px', display: 'flex', flexWrap: 'wrap' }}>
        {nftType.map((type, index) => {
          return (
            <Button
              variant={index === filter ? 'contained' : 'outlined'}
              key={index}
              sx={{ padding: '4px 12px', textTransform: 'none', ml: '8px', mt: '8px', fontSize: '14px' }}
              onClick={e => {
                setFilter(index)
              }}
              color="secondary"
            >
              {t(type)}
              <Typography variant="caption" color="text" sx={{ margin: '-5px 0px 0px 8px' }}>{counts[index]}</Typography>
            </Button>
          )
        })}
      </Box>}
    </MyBox>
  );
}

export default StyledTab