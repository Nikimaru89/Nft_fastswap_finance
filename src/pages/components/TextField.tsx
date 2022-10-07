import React from 'react'

const TextFieldStyle = {
  width: 'calc(100% - 20px)',
  borderRadius: '8px',
  marginTop: '16px',
  height: '100px',
  fontFamily: 'CircularStd',
  padding: '10px'
}

const TextField = (props) => {
  return (
    <textarea className="w3-input w3-border w3-animate-input"
      placeholder={props.placeholder}
      style={TextFieldStyle}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
    />
  )
}
export default TextField;