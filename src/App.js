import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginpage";
import HomePage from "./pages/homepage";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import RegisterPage from "./pages/registerPage.js";
import Cookies from "js-cookie";
import ProfilePage from "./pages/profilepage.js";

function App() {
  const isAuthenticated = !!Cookies.get("user_token");

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
