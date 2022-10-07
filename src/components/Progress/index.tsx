import React from 'react';
import { makeStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { Modal, Backdrop, Fade } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import Progress from './progress'
import { controlProgress } from '../../redux/action/faceAction';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: 'none',
    },
  }),
);

export default function TransitionsModal() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const status = useSelector((state: any) => state.face.progressValue);

  const HandleClose = () => {
    dispatch(controlProgress(false));
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={status}
        onClose={HandleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={status}>
          <div>
            <Progress />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
