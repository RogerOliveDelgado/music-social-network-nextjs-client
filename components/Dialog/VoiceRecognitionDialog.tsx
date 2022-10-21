import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import styles from "./styles.module.css";

const appId = "0c09e38a-9be9-4ba6-8dde-8b89c3688f1d";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface Props {
  setValue: Function;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, backgroundColor: "#353941", color: "white" }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[100],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function VoiceRecognitionDialog({ setValue }: Props) {
  const [open, setOpen] = React.useState(false);
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ language: "es-ES" });

  if (!browserSupportsSpeechRecognition) {
    console.log("no lo permite");
  }

  // console.log(isMicrophoneAvailable);

  const handleClickOpen = async () => {
    // isMicrophoneAvailable;
    console.log(listening);
    setOpen(true);
    startListening();
  };
  const handleClose = () => {
    SpeechRecognition.stopListening();
    console.log(listening);
    setOpen(false);

    console.log(transcript);
    // Aqui se va a quedar con lo que ha escuchado y seteará el value
  };

  return (
    <div className={styles.searchbar_right}>
      <svg
        className="voice-search"
        role="button"
        onClick={handleClickOpen}
        // onTouchStart={}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="#4285f4"
          d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
        ></path>
        <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
        <path
          fill="#fbbc05"
          d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
        ></path>
        <path
          fill="#ea4335"
          d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
        ></path>
      </svg>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Listening...
        </BootstrapDialogTitle>
        {/* width: 20, display: flex, justify-content: center, align-items: center, height: 10 */}
        <DialogContent
          sx={{
            backgroundColor: "#353941",
            width: 320,
            height: 90,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Aqui irian las ondas */}
          <div className="boxContainer">
            <div className="box box1"></div>
            <div className="box box2"></div>
            <div className="box box3"></div>
            <div className="box box4"></div>
            <div className="box box5"></div>
            <div className="box box1"></div>
            <div className="box box2"></div>
            <div className="box box3"></div>
            <div className="box box4"></div>
            <div className="box box5"></div>
          </div>

          <p>Microphone: {listening ? "on" : "off"}</p>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#353941" }}>
          <Button onClick={handleClose}>Stop listening</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
