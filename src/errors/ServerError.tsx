import { Typography } from "@mui/material";
import { useModel } from "../context/model";

const ServerError = () => {
  const model = useModel();
  const serverError = model.serverError;
  const code = model.code;
  return (
    <div>
      <p>An unexpected error occurred: <Typography display="inline" color="error">{serverError}</Typography>.</p>
      <p>Please report this error via email by clicking <a href={`mailto:martinjrobins@gmail.com?subject=diffeq-web-error&body=:__error__:${serverError}:__code__:${code}`}>here</a>.</p>
    </div>
  )
};

export default ServerError;