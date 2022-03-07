import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";

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
      <Router>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
