import React from 'react'
import { makeStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { Modal, Fade } from '@mui/material'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: 'green',
      color: 'white',
      borderRadius: '8px',
      boxShadow: theme.shadows[5],
      padding: '10px 50px 20px',
      textAlign: 'center'
    },
  }),
)

export default function TransitionsModal() {
  const classes = useStyles()
  const status = useSelector((state: any) => state.face);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={status.notificationValue}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={status.notificationValue}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" style={{ fontFamily: 'CircularStd' }}>{status.title}</h2>
            <p id="transition-modal-description" style={{ fontFamily: 'CircularStd' }}>{status.description}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
