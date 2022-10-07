import React from 'react'
import { makeStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { Modal, Fade, IconButton } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { controlValidation } from '../../redux/action/faceAction'
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '0px'
    },
    paper: {
      backgroundColor: 'rgb(211, 47, 47)',
      color: 'white',
      borderRadius: '8px',
      boxShadow: theme.shadows[5],
      textAlign: 'center'
    },
  }),
);

export default function TransitionsModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.face);

  const HandleClose = () => {
    dispatch(controlValidation({ validationValue: false, validationdescription: '' }))
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={status.validationValue}
        onClose={HandleClose}
        closeAfterTransition
      >
        <Fade in={status.validationValue}>
          <div className={classes.paper}>
            <div style={{ padding: '0px 5px 0px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ErrorIcon />
              <p id="transition-modal-description" style={{ fontFamily: 'CircularStd' }}>{status.validationdescription}</p>
              <IconButton
                onClick={HandleClose}
                sx={{ marginLeft: '40px' }}
              ><CloseIcon /></IconButton>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
