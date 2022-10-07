import { MenuEntry } from '@fastswap-uikit'

const fil: MenuEntry[] = [
  {
    label: 'Bahay',
    icon: 'HomeIcon',
    href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}`,
  },
  {
    label: 'Kalakal',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Palitan',
        href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}`,
      },
      {
        label: 'Pagkatubig',
        href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}#/pool`,
      },
      {
        label: 'Exchange Old Fast',
        href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}#/exchange-fast`,
      },
      {
        label: 'Exchange YFT',
        href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}#/exchange-yft`,
      },
      {
        label: 'Exchange MVP',
        href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}#/exchange-mvp`,
      },
    ],
  },
  {
    label: 'NFT Marketplace',
    icon: 'MarketIcon',
    href: '/'
  },
  // {
  //   label: 'Mga bukid',
  //   icon: 'FarmIcon',
  //   href: `${process.env.REACT_APP_MAIN_HOST}/farms`,
  // },
  // {
  //   label: 'NewFarms',
  //   icon: 'FarmIcon',
  //   href: `${process.env.REACT_APP_NEW_FARMS_HOST}/newfarms`,
  // },
  {
    label: 'Mga bukid V3',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_NEW_FARMSV3_HOST}/`,
  },
  {
    label: 'Mga bukid V4',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_NEW_FARMSV4_HOST}/`,
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: `${process.env.REACT_APP_LOTTERY_HOST}`,
  },
  {
    label: 'Impormasyon',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Pangkalahatang-ideya',
        href: `${process.env.REACT_APP_INFO_HOST}`,
      },
      {
        label: 'Mga Token',
        href: `${process.env.REACT_APP_INFO_HOST}/tokens`,
      },
      {
        label: 'Pares',
        href: `${process.env.REACT_APP_INFO_HOST}/pairs`,
      },
      {
        label: 'Mga account',
        href: `${process.env.REACT_APP_INFO_HOST}/accounts`,
      },
    ],
  },
]

export default fil
