// 2023-03-09 10:00:00

import { Alert, AlertColor, Snackbar, SnackbarProps } from "@mui/material";
import * as React from "react";

export interface INotiRef {
  noti: (message: string, severity?: AlertColor) => void;
}

export interface INotiSnackbarProps {
  notiRef?: React.MutableRefObject<INotiRef>;
  snackbarProps?: SnackbarProps;
}

export function NotiSnackbar(props: INotiSnackbarProps) {
  const { notiRef, snackbarProps } = props;

  //

  const [open, setOpen] = React.useState(false);

  const [severity, setSeverity] = React.useState<AlertColor>("success");

  const [message, setMessage] = React.useState("");

  const handleClose = React.useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return;
      setOpen(false);
    },
    []
  );

  React.useEffect(() => {
    if (notiRef)
      notiRef.current = {
        noti: (message: string, severity?: AlertColor) => {
          setOpen(true);
          setMessage(message);
          setSeverity(severity ?? "success");
        },
      };
  }, [notiRef]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      {...snackbarProps}
    >
      <Alert
        elevation={4}
        variant="filled"
        onClose={handleClose}
        sx={{ width: "100%" }}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
