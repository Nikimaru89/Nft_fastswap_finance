import React, { useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { useTranslation } from "../../contexts/Localization"
import api from '../../api'
import { Typography } from "@mui/material"
import CardsView from "../../components/CardsView"

const LatestDrops = ({ noHeader = false, filter = "&type=all&payment=all&sort=Recently Added" }) => {
  const { library, account } = useWeb3React()
  const { t } = useTranslation()
  const [drops, setDrops] = useState([])
  const [limit, setLimit] = useState(12)
  const [max, setMax] = useState(12)

  const fetchDrops = async () => {
    const res = await api.nft.getLatestDrops(account || "", limit, filter)
    const { data, total } = res.data
    setDrops([...data])
    setMax(total[0] ? total[0].total : 0)
  }

  useEffect(() => {
    fetchDrops()
  }, [library, account, limit, filter])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {!noHeader && <Typography variant='h4' sx={{ mt: '64px', mb: '24px', color: 'text.main' }}>{t('Latest drops')}</Typography>}
      <CardsView drops={drops} account={account} max={max} limit={limit} setLimit={setLimit} />
    </>
  )
}

export default LatestDrops