import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, Button, Typography, Box } from '@mui/material'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import getDateFormat from '../../utils/getDateFormat'
import sale from '../assets2/sale.png'
import { visuallyHidden } from '@mui/utils'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../contexts/Localization'

const BottomBar = styled.div`
  display:flex;
  justify-content:center;
`
const Text = styled.div`
  font-family: 'CircularStd';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  color: #363936;
`
const Sale = styled.div`
  max-width:80px;
  width:100%;
  display:flex;
`
const Nft = styled.div`
  display:flex;
`
const Token = styled.div`
  display:flex;
`
const NFTImage = styled.img`
  width:40px;
  height:40px;
  border-radius:8px;
  margin-right:10px;
`
const TokenImage = styled.img`
  width:32px;
  height:32px;
`
const Right = styled.div`
  height:36px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
`
const NFTHeader = styled.div`
  font-family: 'CircularStd';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: #131413;
`
const NFTText = styled.div`
  font-family: 'CircularStd';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #183B56;
`
const TokenHeader = styled.div`
  font-family: 'CircularStd';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #131413;
`
const TokenText = styled.div`
  font-family: 'CircularStd';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #757B75;
`
const ColorText = styled(Text)`
  color: #183B56;
`
const Time = styled.div`
  max-width:150px;
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
`

interface Data {
  event: string;
  nft: any;
  price: number;
  quantity: number;
  time: string;
  name: string;
  group: string;
  payment: string;
  priceUsd: number;
  from: string;
  image: string;
  user_info: any;
}
const headCells: HeadCell[] = [
  { id: 'event', numeric: false, disablePadding: true, label: 'Event' },
  { id: 'name', numeric: true, disablePadding: false, label: 'NFT' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'from', numeric: true, disablePadding: false, label: 'From' },
  { id: 'time', numeric: true, disablePadding: false, label: 'Time' },
];

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  let temp1 = a[orderBy], temp2 = b[orderBy]
  if (orderBy === 'from') {
    temp1 = a['user_info'][0].name
    temp2 = b['user_info'][0].name
  }
  if (temp2 < temp1) {
    return -1;
  }
  if (temp2 > temp1) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const { t } = useTranslation()
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sx={{ color: 'grey !important' }}
            align='left'
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              sx={{ color: 'grey !important' }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {t(headCell.label)}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 900,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

const EnhancedTable = (props) => {
  const { acts } = props
  const { t } = useTranslation()
  const classes = useStyles()
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('event')
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [max, setMax] = useState<number>(0)
  const curTime = new Date().getTime()
  const navigate = useNavigate()

  useEffect(() => {
    const maxpage = (acts.length - (acts.length % 10 || 10)) / 10
    setMax(maxpage)
  }, [acts])

  const handleNext = () => {
    if (page < max)
      setPage(page + 1)
  }

  const handlePrev = () => {
    if (page > 0)
      setPage(page - 1)
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = acts.map((n) => n.event)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleNavigate = (index) => {
    console.log(acts[index])
    navigate(`/assets/${acts[index].contract}/${acts[index].tokenId}`)
  }

  const emptyRows = 10 - Math.min(10, acts.length - page * 10)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer sx={{ height: props.type === 'big' ? 'none' : '347px' }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={acts.length}
            />
            <TableBody >
              {
                stableSort(acts, getComparator(order, orderBy))
                  .slice(page * 10, page * 10 + 10)
                  .map((row, index) => (
                    <TableRow hover key={index} style={{ cursor: "pointer" }} onClick={() => handleNavigate(index)}>
                      <TableCell component="th" scope="row">
                        <Sale>
                          <img src={sale} alt="event" style={{ marginRight: '10px' }} />
                          <Text>{t(`${row.event}`)}</Text>
                        </Sale>
                      </TableCell>

                      <TableCell align="left">
                        <Nft>
                          <NFTImage src={row.image as string} />
                          <Right>
                            <NFTHeader>
                              {row.name}
                            </NFTHeader>
                            <NFTText>
                              {row.group}
                            </NFTText>
                          </Right>
                        </Nft>
                      </TableCell>

                      <TableCell align="left">
                        {row.price > 0 &&
                          <Token>
                            <TokenImage src={`/assets/images/${row.payment}.svg`} />
                            <Right style={{ marginLeft: '10px' }}>
                              <TokenHeader>
                                {row.price} {row.payment}
                              </TokenHeader>
                              <TokenText>
                                ${Number(row.priceUsd).toFixed(2)}
                              </TokenText>
                            </Right>
                          </Token>
                        }
                      </TableCell>

                      <TableCell align="left">
                        <Text>{row.quantity}</Text>
                      </TableCell>

                      <TableCell align="left">
                        <ColorText>{row.user_info && row.user_info[0].name}</ColorText>
                      </TableCell>

                      <TableCell align="left">
                        <Time>
                          <ColorText>
                            {getDateFormat(curTime - (row.time as number))} ago
                          </ColorText>
                        </Time>
                      </TableCell>
                    </TableRow>
                  ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {max > 0 &&
        <BottomBar>
          <BottomBar>
            <Button variant='outlined' sx={{ borderRadius: '50px', mr: '20px' }} onClick={handlePrev}>
              <SkipPreviousIcon />
              <Typography >{page === 0 ? 1 : 10 * page}-{10 * (page + 1)}</Typography>
            </Button>

            <Button variant='outlined' sx={{ borderRadius: '50px' }} onClick={handleNext}>
              <Typography >{10 * (page + 1)}-{10 * (page + 2)}</Typography>
              <SkipNextIcon />
            </Button>
          </BottomBar>
        </BottomBar>}
    </div>
  )
}

export default EnhancedTable