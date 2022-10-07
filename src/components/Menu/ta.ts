import { MenuEntry } from '@fastswap-uikit'

const config: MenuEntry[] = [
  {
    label: 'வீடு',
    icon: 'HomeIcon',
    href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}`,
  },
  {
    label: 'வர்த்தகம்',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'பரிமாற்றம்',
        href: `${process.env.REACT_APP_BASE_EXCHANGE_URL}`,
      },
      {
        label: 'நீர்மை நிறை',
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
  //   label: 'பண்ணை',
  //   icon: 'FarmIcon',
  //   href: `${process.env.REACT_APP_MAIN_HOST}/farms`,
  // },
  // {
  //   label: 'NewFarms',
  //   icon: 'FarmIcon',
  //   href: `${process.env.REACT_APP_NEW_FARMS_HOST}/newfarms`,
  // },
  {
    label: 'பண்ணை V3',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_NEW_FARMSV3_HOST}`,
  },
  {
    label: 'பண்ணை V4',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_NEW_FARMSV4_HOST}`,
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: `${process.env.REACT_APP_LOTTERY_HOST}`,
  },
  {
    label: 'தகவல்',
    icon: 'InfoIcon',
    items: [
      {
        label: 'கண்ணோட்டம்',
        href: `${process.env.REACT_APP_INFO_HOST}`,
      },
      {
        label: 'டோக்கன்கள்',
        href: `${process.env.REACT_APP_INFO_HOST}/tokens`,
      },
      {
        label: 'சோடிகள்',
        href: `${process.env.REACT_APP_INFO_HOST}/pairs`,
      },
      {
        label: 'கணக்குகள்',
        href: `${process.env.REACT_APP_INFO_HOST}/accounts`,
      },
    ],
  },
]

export default config
