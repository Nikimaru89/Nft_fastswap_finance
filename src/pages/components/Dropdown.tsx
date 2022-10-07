import React from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import { InputLabel, MenuItem, FormControl, Select, SelectChangeEvent } from '@mui/material'
import DUKE from '../assets2/Duke.png'
import BNB from '../assets2/Bnb.png'
import FAST from '../assets2/Fast.png'
import { Typography } from '@mui/material'
import { useTranslation } from '../../contexts/Localization'
// import './index.scss'

const InputStyle = {
  width: 'calc(100% - 20px)',
  height: '40px',
  fontFamily: 'CircularStd',
  padding: '0px 10px',
  border: '1px solid #CECECE',
  borderTopRightRadius: '8px',
  borderBottomRightRadius: '8px',
}
const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    menu: {
      border: '1px solid black'
    }
  }),
);

const Tokeninfo = [
  {
    symbol: DUKE,
    name: "DUKE"
  },
  {
    symbol: FAST,
    name: "FAST"
  },
  {
    symbol: BNB,
    name: "BNB"
  }
]
export default function SimpleSelect({ info, setInfo, disabled }) {
  const classes = useStyles()
  const { t } = useTranslation()

  const handleChange = (event: SelectChangeEvent<any>) => {
    setInfo({ ...info, payment: event.target.value })
  };

  const handlePriceChange = (event) => {
    setInfo({ ...info, price: event.target.value })
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ alignItems: 'center', display: 'flex', marginRight: '4px', width: '70px', height: '24px', justifyContent: 'space-between' }}>
              <img src={DUKE} alt="token" />
              <Typography variant='subtitle2'>DUKE</Typography>
            </div>
          </div>
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={info?.payment || "BNB"}
          onChange={handleChange}
          disabled={disabled}
        >
          {
            Tokeninfo.map((token, index) => (
              <MenuItem value={token.name} key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0px' }}>
                  <div style={{ alignItems: 'center', display: 'flex', marginRight: '4px', width: '70px', height: '15px', justifyContent: 'space-between' }}>
                    <img src={token.symbol} alt="token" />
                    <Typography variant='subtitle2'>{token.name}</Typography>
                  </div>
                </div>
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <input className="w3-input w3-border w3-animate-input" type="text"
        placeholder={t("Price")}
        value={info?.price || ""}
        style={InputStyle}
        disabled={disabled}
        onChange={handlePriceChange}
      />
    </div>
  );
}
