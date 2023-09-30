import { useModel } from "../context/model";

const serverError: React.FC = () => {
  const model = useModel();
  const serverError = model.serverError;
  const code = model.code;
  return (
    <div>
      <p>An unexpected error occurred, {serverError}.</p>
      <p>Please report this error via email by clicking <a href={`mailto:martinjrobins@gmail.com?subject=diffeq-web-error&body=error:${serverError}code:${code}`}>here</a>.</p>
    </div>
  )
};

export default serverError;