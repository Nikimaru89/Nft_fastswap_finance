import { InputProps } from '@mui/material'
import React, { FC } from 'react'

const InputStyle = {
  width: 'calc(100% - 20px)',
  height: '40px',
  fontFamily: 'CircularStd',
  padding: '0px 10px',
  border: '1px solid #CECECE',
  borderRadius: '8px'
}

const Input: FC<InputProps> = (props) => {
  return (
    <input className="w3-input w3-border w3-animate-input" type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value as string}
      style={InputStyle}
      disabled={props.disabled}
    />
  )
}
export default Input;