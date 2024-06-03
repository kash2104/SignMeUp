import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllEvents from "./pages/AllEvents";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<a href="http://localhost:4000/auth/google">Sig up Here</a>}
        />
        <Route path="/signup/created/active" element={<AllEvents />} />
      </Routes>
    </div>
  );
}

export default App;
