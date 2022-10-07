export const controlProgress = (value: boolean) => {
  return {
    type: 'PROGRESS',
    payload: value
  }
}

export const controlNotification = ({ notificationValue, title, description }) => {
  return {
    type: 'NOTIFICATION',
    payload: { notificationValue, title, description }
  }
}

export const controlValidation = ({ validationValue, validationdescription }) => {
  return {
    type: 'VALIDATION',
    payload: { validationValue, validationdescription }
  }
}

export const controlModal = ({ modalValue }) => {
  return {
    type: 'MODAL',
    payload: { modalValue }
  }
}

export const controlMenu = ({ menuValue }) => {
  return {
    type: 'MENU',
    payload: { menuValue }
  }
}

export const adminAccess = ({ value }) => {
  return {
    type: 'ADMIN',
    payload: { value }
  }
}