const menuitems = ["Admin", "Overview", "Explore", "Rankings", "Activities", "Account", "Minting"]
const path = window.location.pathname.slice(1, window.location.pathname.length)
const item = menuitems.filter(menu => path.toLowerCase().includes(menu.toLowerCase()))

const initialstate = {
  progressValue: false,

  notificationValue: false,
  title: "",
  description: "",

  validationValue: false,
  validationdescription: "",

  modalValue: false,

  menuValue: menuitems.indexOf(item[0]),
  adminAccess: ""
}

const reducer = (state = initialstate, action: any) => {
  switch (action.type) {
    case "PROGRESS":
      return {
        ...state,
        progressValue: action.payload
      }
    case "NOTIFICATION":
      const { notificationValue, title, description } = action.payload
      return {
        ...state,
        notificationValue: notificationValue,
        title: title,
        description: description
      }
    case "VALIDATION":
      const { validationValue, validationdescription } = action.payload
      return {
        ...state,
        validationValue: validationValue,
        validationdescription: validationdescription
      }
    case "MODAL":
      const { modalValue } = action.payload
      return {
        ...state,
        modalValue: modalValue,
      }
    case "MENU":
      const { menuValue } = action.payload
      return {
        ...state,
        menuValue: menuValue,
      }
    case "ADMIN":
      const { value } = action.payload
      return {
        ...state,
        adminAccess: value
      }
    default:
      return state;
  }
}

export default reducer;