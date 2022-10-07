import React from 'react'
import { makeStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { Modal, Fade, Typography, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { controlModal } from '../../redux/action/faceAction'
import ClearIcon from '@mui/icons-material/Clear';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: 'white',
      color: 'black',
      borderRadius: '8px',
      boxShadow: theme.shadows[5],
      padding: '0px 50px 20px',
      textAlign: 'center'
    },
  }),
);



export default function BidModal(props) {

  const classes = useStyles()

  const dispatch = useDispatch()
  const status = useSelector((state: any) => state.face)

  const HandleClose = () => {
    dispatch(controlModal({ modalValue: false }))
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={status.modalValue}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={status.modalValue}>
          <div className={classes.paper}>
            <div style={{
              display: 'flex',
              justifyContent: 'right',
              marginTop: '20px'
            }}>
              <IconButton onClick={HandleClose}><ClearIcon /></IconButton>
            </div>
            <Typography variant="h3" sx={{ margin: '10px 0px 30px' }}>{props.title}</Typography>
            {props.description}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
