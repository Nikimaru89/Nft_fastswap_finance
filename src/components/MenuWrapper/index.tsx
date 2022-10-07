import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import React from 'react'
import useAdminLogin from '../../hooks/useAdminLogin'
import Menu from '../Menu'

interface IProps {
  isLanding?: boolean,
  activeIndex?: number,
  children: any
}

const MenuWrapper: React.FC<IProps> = ({
  children,
  isLanding = false
}) => {

  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useAdminLogin(account, dispatch)

  return (
    isLanding
      ? children
      :
      <Menu>
        {children}
      </Menu>
  )
}

export default MenuWrapper
