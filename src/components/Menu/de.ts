import { MenuEntry } from '@fastswap-uikit'

const de: MenuEntry[] = [
  {
    label: 'Zuhause',
    icon: 'HomeIcon',
    href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}`,
  },
  {
    label: 'Handel',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Austausch',
        href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}`,
      },
      {
        label: 'Liquidität',
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
  //   label: 'Bauernhöfe',
  //   icon: 'FarmIcon',
  //   href: `${process.env.REACT_APP_MAIN_HOST}/farms`,
  // },
  // {
  //   label: 'NewFarms',
  //   icon: 'FarmIcon',
  //   href: `${process.env.REACT_APP_NEW_FARMS_HOST}/newfarms`,
  // },
  {
    label: 'Bauernhöfe V3',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_NEW_FARMSV3_HOST}/`,
  },
  {
    label: 'Bauernhöfe V4',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_NEW_FARMSV4_HOST}/`,
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: `${process.env.REACT_APP_LOTTERY_HOST}`,
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Überblick',
        href: `${process.env.REACT_APP_INFO_HOST}`,
      },
      {
        label: 'Tokens',
        href: `${process.env.REACT_APP_INFO_HOST}/tokens`,
      },
      {
        label: 'Paare',
        href: `${process.env.REACT_APP_INFO_HOST}/pairs`,
      },
      {
        label: 'Konto',
        href: `${process.env.REACT_APP_INFO_HOST}/accounts`,
      },
    ],
  },
]

export default de
