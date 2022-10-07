import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../../../api'

import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography, Paper, Button, Box } from '@mui/material'

import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import { visuallyHidden } from '@mui/utils'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../../contexts/Localization'

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
const Nft = styled.div`
  display:flex;
  align-items:center;
`
const Token = styled.div`
  display:flex;
  align-items:center;
`
const NFTImage = styled.img`
  width:40px;
  height:40px;
  border-radius:8px;
  margin:0px 10px 0px 20px;
`
const TokenImage = styled.img`
  width:32px;
  height:32px;
  margin-right:10px;
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

interface Data {
  name: any;
  priceUsd: any;
  time: any;
}

const rows = [
  {
    name: "NFT Name",
    token: { token: "152.25 DUKE", text: "$234.88" },
    time: "2021-11-28 05:56:20"
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
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

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'NFT' },
  { id: 'priceUsd', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'time', numeric: true, disablePadding: false, label: 'Time' },
];

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
  const { t } = useTranslation()
  const { order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

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
      minWidth: 750,
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

export default function EnhancedTable({ filter = '' }) {
  const classes = useStyles()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('name')
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [max, setMax] = useState<number>(0)
  const [drop, setDrop] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    const maxpage = (filtered.length - (filtered.length % 10 || 10)) / 10
    setMax(maxpage)
  }, [filtered])// eslint-disable-line

  useEffect(() => {
    if (!!drop) {
      setFiltered(drop.filter(it => it.name.includes(filter)))
    }
  }, [filter, drop])

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
      const newSelecteds = filtered.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([]);
  }

  const fetchRank = async () => {
    const { data } = await api.activity.getRankBySales()
    setDrop([...data])
  }

  const getTime = (time) => {
    const date = new Date(parseInt(time, 10))
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  }

  const handleNavigate = (index) => {
    navigate(`/assets/${filtered[index].contract}/${filtered[index].tokenId}`)
  }

  useEffect(() => {
    fetchRank()
    const maxpage = (filtered.length - (filtered.length % 10 || 10)) / 10
    setMax(maxpage)
  }, [])// eslint-disable-line

  const emptyRows = 10 - Math.min(10, filtered.length - page * 10)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
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
              rowCount={rows.length}
            />
            <TableBody>
              {
                stableSort(filtered, getComparator(order, orderBy))
                  .slice(page * 10, page * 10 + 10)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleNavigate(index)}
                      >

                        <TableCell align="left">
                          <Nft>
                            <Text>{index + (page - 1) * 10 + 10 + 1}</Text>
                            <NFTImage src={row.image} />
                            <NFTHeader>{row.name}</NFTHeader>
                          </Nft>
                        </TableCell>

                        <TableCell align="left">
                          <Token>
                            <TokenImage src={`/assets/images/${row.payment}.svg`} />
                            <Right>
                              <TokenHeader>{row.price}</TokenHeader>
                              <TokenText>{row.payment}</TokenText>
                            </Right>
                          </Token>
                        </TableCell>

                        <TableCell align="left">
                          <Text>{getTime(row.time)}</Text>
                        </TableCell>

                      </TableRow>
                    );
                  })}
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
  );
}
