import { MenuEntry } from '@fastswap-uikit'

const it: MenuEntry[] = [
  {
    label: 'Casa',
    icon: 'HomeIcon',
    href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}`,
  },
  {
    label: 'Commercio',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Scambio',
        href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}`,
      },
      {
        label: 'Liquidità',
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
  //   label: 'Fattorie',
  //   icon: 'FarmIcon',
  //   href: `${process.env.REACT_APP_MAIN_HOST}/farms`,
  // },
  // {
  //   label: 'NewFarms',
  //   icon: 'FarmIcon',
  //   href: `${process.env.REACT_APP_NEW_FARMS_HOST}/newfarms`,
  // },
  {
    label: 'Fattorie V3',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_NEW_FARMSV3_HOST}/`,
  },
  {
    label: 'Fattorie V4',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_NEW_FARMSV4_HOST}/`,
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: `${process.env.REACT_APP_LOTTERY_HOST}`,
  },
  {
    label: 'Informazioni',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Panoramica',
        href: `${process.env.REACT_APP_INFO_HOST}`,
      },
      {
        label: 'Gettoni',
        href: `${process.env.REACT_APP_INFO_HOST}/tokens`,
      },
      {
        label: 'Coppie',
        href: `${process.env.REACT_APP_INFO_HOST}/pairs`,
      },
      {
        label: 'Accounts',
        href: `${process.env.REACT_APP_INFO_HOST}/accounts`,
      },
    ],
  },
]

export default it
