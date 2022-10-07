import { MenuEntry } from '@fastswap-uikit'

const zhcn: MenuEntry[] = [
  {
    label: '\u9996\u9875',
    icon: 'HomeIcon',
    href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}`,
  },
  {
    label: '\u4ea4\u6613',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: '\u5151\u6362',
        href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}`,
      },
      {
        label: '\u6d41\u52a8\u6027',
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
  //   label: '\u519c\u573a',
  //   icon: 'FarmIcon',
  //   href: `${process.env.REACT_APP_MAIN_HOST}/farms`,
  // },
  // {
  //   label: 'NewFarms',
  //   icon: 'FarmIcon',
  //   href: `${process.env.REACT_APP_NEW_FARMS_HOST}/newfarms`,
  // },
  {
    label: 'NewFarms V3',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_NEW_FARMSV3_HOST}`,
  },
  {
    label: 'NewFarms V4',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_NEW_FARMSV4_HOST}`,
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: `${process.env.REACT_APP_LOTTERY_HOST}`,
  },
  {
    label: '信息',
    icon: 'InfoIcon',
    items: [
      {
        label: '\u6982\u89c8',
        href: `${process.env.REACT_APP_INFO_HOST}`,
      },
      {
        label: '代币',
        href: `${process.env.REACT_APP_INFO_HOST}/tokens`,
      },
      {
        label: '\u4ee3\u5e01',
        href: `${process.env.REACT_APP_INFO_HOST}/pairs`,
      },
      {
        label: '\u8d26\u6237',
        href: `${process.env.REACT_APP_INFO_HOST}/accounts`,
      },
    ],
  },
]

export default zhcn
