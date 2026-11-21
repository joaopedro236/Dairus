import "./alert.css";
import { useEffect } from "react";
export default function Alert({ setErrorMessage, errorMessage }) {
  useEffect =
    (() => {
      if (!errorMessage) return;

      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 10000);

      return () => clearTimeout(timer);
    },
    [errorMessage, setErrorMessage]);
  return (
    <>
      <div className="alert bg-alert flex flex-col gap-3 ">
        <h1>Alerta de Error</h1>
        <p className="text-sm ">{setErrorMessage}</p>
      </div>
    </>
  );
}
