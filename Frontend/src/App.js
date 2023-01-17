import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Ledy from "./pages/ledy/ledy";
import Ekran096 from "./pages/ekran096/ekran096";
import Ekran16x2 from "./pages/ekran16x2/ekran16x2";
import Wykres from "./pages/wykres/wykres";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from './utilities/ProtectedRoute';
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute> }/>
            <Route path='/ledy' element={<ProtectedRoute> <Ledy /> </ProtectedRoute> }/>
            <Route path='/ekran096' element={<ProtectedRoute> <Ekran096 /> </ProtectedRoute> }/>
            <Route path='/ekran16x2' element={<ProtectedRoute> <Ekran16x2 /> </ProtectedRoute> }/>
            <Route path='/wykres' element={<ProtectedRoute> <Wykres /> </ProtectedRoute> }/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
