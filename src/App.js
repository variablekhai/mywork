import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProtectedRoute from "./pages/ProtectedRoute"
import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {

  const theme = createTheme({
    palette: {
        primary: {
            main: "#39B54A",
            light: "#D5E0D5"
        }
    },
    typography: {
        fontFamily: "Poppins",
        h4: {
            fontFamily: "Marcellus"
        },
        button: {
            textTransform: 'none'
        }
    }
})

  return (
    <ThemeProvider theme={theme}>
      <UserAuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        </Routes>
      </UserAuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
