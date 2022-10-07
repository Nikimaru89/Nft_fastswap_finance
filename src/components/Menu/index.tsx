import React, { useContext, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from '../../contexts/Localization'
import { Menu as UikitMenu } from '@fastswap-uikit'
import api from '../../api'
import { languageList } from '../../constants/localization/languages'
import { LanguageContext } from '../../hooks/LanguageContext'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import { injected, bsc, walletconnect } from '../../connectors'
import useTheme from '../../hooks/useTheme'
import config from './config'
import eses from './eses'
import ar from './ar'
import zhcn from './zhcn'
import zhtw from './zhtw'
import de from './de'
import nl from './nl'
import fil from './fil'
import fi from './fi'
import fr from './fr'
import el from './el'
import hi from './hi'
import hu from './hu'
import id from './id'
import it from './it'
import ja from './ja'
import ko from './ko'
import pt from './pt'
import ro from './ro'
import ru from './ru'
import sv from './sv'
import ta from './ta'
import tr from './tr'
import uk from './uk'
import vi from './vi'

const Menu: React.FC = (props) => {
  const { t } = useTranslation()
  const { account, activate, deactivate } = useWeb3React()
  const { selectedLanguage } = useContext(LanguageContext)

  const [isDark, toggleDarkMode] = useDarkModeManager()
  const { toggleTheme } = useTheme()
  const topMenu = [
    {
      label: "Trade",
      translated: t("Trade")
    },
    {
      label: "Earn",
      translated: t("Earn")
    },
    {
      label: "Win",
      translated: t("Win")
    },
    {
      label: "NFT",
      translated: t("NFT")
    },
  ]

  useEffect(() => {
    if (!account && window.localStorage.getItem('connectorId')) {
      activate(injected)
    }
    if (window.localStorage.getItem('IS_DARK') === 'true') {
      toggleDarkMode(true)
    } else {
      toggleDarkMode(false)
    }
  }, [account, activate]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (account) {
      api.user.getUser(account).then((res) => {
        if (!res.data) {
          api.user.createUser("unname", "", "", "", "", account, "", "", "", "", "", "")
        }
      })
    }
  }, [account])

  let links = config
  if (selectedLanguage?.code === 'es-ES') {
    links = eses
  } else if (selectedLanguage?.code === 'ar') {
    links = ar
  } else if (selectedLanguage?.code === 'zh-CN') {
    links = zhcn
  } else if (selectedLanguage?.code === 'zh-TW') {
    links = zhtw
  } else if (selectedLanguage?.code === 'de') {
    links = de
  } else if (selectedLanguage?.code === 'nl') {
    links = nl
  } else if (selectedLanguage?.code === 'fil') {
    links = fil
  } else if (selectedLanguage?.code === 'fi') {
    links = fi
  } else if (selectedLanguage?.code === 'fr') {
    links = fr
  } else if (selectedLanguage?.code === 'el') {
    links = el
  } else if (selectedLanguage?.code === 'hi') {
    links = hi
  } else if (selectedLanguage?.code === 'hu') {
    links = hu
  } else if (selectedLanguage?.code === 'id') {
    links = id
  } else if (selectedLanguage?.code === 'it') {
    links = it
  } else if (selectedLanguage?.code === 'ja') {
    links = ja
  } else if (selectedLanguage?.code === 'ko') {
    links = ko
  } else if (selectedLanguage?.code === 'pt-BR') {
    links = pt
  } else if (selectedLanguage?.code === 'ro') {
    links = ro
  } else if (selectedLanguage?.code === 'ru') {
    links = ru
  } else if (selectedLanguage?.code === 'sv-SE') {
    links = sv
  } else if (selectedLanguage?.code === 'ta') {
    links = ta
  } else if (selectedLanguage?.code === 'tr') {
    links = tr
  } else if (selectedLanguage?.code === 'uk') {
    links = uk
  } else if (selectedLanguage?.code === 'vi') {
    links = vi
  }
  const { currentLanguage, setLanguage } = useTranslation()

  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={(connectorId: string) => {
        if (connectorId === 'walletconnect') {
          return activate(walletconnect)
        }

        if (connectorId === 'bsc') {
          return activate(bsc)
        }

        return activate(injected)
      }}
      logout={deactivate}
      isDark={isDark}
      isMarket={true}
      toggleTheme={() => {
        toggleDarkMode(!isDark)
        toggleTheme()
      }}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={0}
      topMenu={topMenu}
      {...props}
    />
  )
}

export default Menu