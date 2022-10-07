import React from 'react';
// import { makeStyles, createStyles } from '@mui/styles';
// import { Theme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       '& > * + *': {
//         marginLeft: theme.spacing(2),
//       },
//     },
//   }),
// );

export default function CircularIndeterminate() {

  return (
    // <div className={classes.root}>
    <CircularProgress />
    // </div>
  );
}
