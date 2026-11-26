import "./alert.css";
import { useEffect } from "react";
export default function Alert({ setErrorMessage, errorMessage }) {
  useEffect (() => {
    console.log("Mensagem recebida:", errorMessage);

      if (!errorMessage) return;

      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 10000);

      return () => clearTimeout(timer);
    },
      [errorMessage, setErrorMessage]);
  if (!errorMessage) return null;
  return (
    <>
      <div className="alert bg-alert flex flex-col gap-1">
        <h1>Alerta de Error</h1>
        <p className="text-sm ">{errorMessage}</p>
      </div>
    </>
  );
}
