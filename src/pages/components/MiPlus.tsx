import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

interface GroupSizesColorProps {
  value: number,
  onChange: (val: number) => void
  disabled?: boolean
}

const useStyles = makeStyles((theme) =>
  createStyles({
    leftBtn: {
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
      border: '1px solid #CECECE !important',
      color: '#CECECE !important'
    },
    rightBtn: {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      border: '1px solid #CECECE !important',
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px',
      color: '#CECECE !important'
    },
    middle: {
      width: '100px',
      padding: '10px 0px !important',
      color: '#363936 !important',
      border: '1px solid #CECECE !important',
      textAlign: 'center'
    }
  }),
);

const GroupSizesColors = (props: GroupSizesColorProps) => {
  const classes = useStyles();

  const minus = () => {
    if (props.value > 1) {
      props.onChange(props.value - 1)
    }
  }
  const plus = () => {
    props.onChange(props.value + 1)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Button className={classes.leftBtn} onClick={minus} disabled={props?.disabled}>
        <Typography variant="h5">-</Typography>
      </Button>
      <Box className={classes.middle}>
        <Typography variant="h5">{props.value}</Typography>
      </Box>
      <Button className={classes.rightBtn} onClick={plus} disabled={props?.disabled}>
        <Typography variant="h5">+</Typography>
      </Button>
    </Box>
  )
}

export default GroupSizesColors