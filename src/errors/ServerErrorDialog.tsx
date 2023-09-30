import { Dialog, DialogTitle } from "@mui/material";
import ServerError from "./ServerError";
import { useModel, useModelDispatch } from "../context/model";

const ServerErrorDialog = () => {
  const model = useModel();
  const dispatch = useModelDispatch();
  const open = model.serverError !== undefined;
  const handleClose = () => {
    dispatch({ type: 'setServerError', error: undefined });
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Unexpected Error</DialogTitle>
      <ServerError />
    </Dialog>
  )
};

export default ServerErrorDialog;