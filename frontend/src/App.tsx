import Routelist from "./routes";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { userSessionAsync } from "./features/authSlice";
import FacebookPixel from "./utils/FacebookPixel";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userSessionAsync());
  });

  return (
    <>
      <FacebookPixel />
      <Routelist />
    </>
  );
}

export default App;
