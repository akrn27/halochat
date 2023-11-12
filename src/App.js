import { Button } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginpage";
import HomePage from "./pages/homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
