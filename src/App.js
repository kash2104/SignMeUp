import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllEvents from "./pages/AllEvents";
import SignUpButton from "./component/SignUpButton";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUpButton />} />
        <Route path={`/signup/created/all`} element={<AllEvents />} />
      </Routes>
    </div>
  );
}

export default App;
