import Routelist from "./routes";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { userSessionAsync } from "./features/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userSessionAsync());
  });

  return (
    <>
      <Routelist />
    </>
  );
}

export default App;
