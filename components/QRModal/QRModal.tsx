import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import QRCode from 'react-qr-code';

type Props = {
  state: boolean;
  onClose: () => void;
  url: string;
};

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const QRModal = ({ state, onClose, url }: Props) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={state}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={state}>
        <Box sx={style}>
          <QRCode
            size={250}
            level="H"
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={url}
            viewBox={`0 0 256 256`}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default QRModal;
