import { MenuEntry } from '@fastswap-uikit'

const tr: MenuEntry[] = [
  {
    label: 'Ev',
    icon: 'HomeIcon',
    href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}`,
  },
  {
    label: 'Ticaret',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Değiş tokuş',
        href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}`,
      },
      {
        label: 'Likidite',
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
  //   label: 'Çiftlik',
  //   icon: 'FarmIcon',
  //   href: `${process.env.REACT_APP_MAIN_HOST}/farms`,
  // },
  // {
  //   label: 'NewFarms',
  //   icon: 'FarmIcon',
  //   href: `${process.env.REACT_APP_NEW_FARMS_HOST}/newfarms`,
  // },
  {
    label: 'Çiftlik V3',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_NEW_FARMSV3_HOST}`,
  },
  {
    label: 'Çiftlik V4',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_NEW_FARMSV4_HOST}`,
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: `${process.env.REACT_APP_LOTTERY_HOST}`,
  },
  {
    label: 'Bilgi',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Genel bakış',
        href: `${process.env.REACT_APP_INFO_HOST}`,
      },
      {
        label: 'Jetonlar',
        href: `${process.env.REACT_APP_INFO_HOST}/tokens`,
      },
      {
        label: 'çiftler',
        href: `${process.env.REACT_APP_INFO_HOST}/pairs`,
      },
      {
        label: 'Hesaplar',
        href: `${process.env.REACT_APP_INFO_HOST}/accounts`,
      },
    ],
  },
]

export default tr
