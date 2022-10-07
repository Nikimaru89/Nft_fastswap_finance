import { useEffect } from "react"
import api from '../api'
import { adminAccess } from "../redux/action/faceAction"

const useAdminLogin = (account, dispatch) => {

  useEffect(() => {
    if (account) {
      api.admin.checkAdmin(account).then(res => {
        if (res.data.success) {
          dispatch(adminAccess({ value: res.data.token }))
        } else {
          dispatch(adminAccess({ value: res.data.token }))
        }
      })
    }
  }, [account, dispatch])
}

export default useAdminLogin