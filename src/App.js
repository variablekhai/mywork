import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import EditProfile from './pages/EditProfile'
import ProtectedRoute from "./pages/ProtectedRoute"
import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {

  const theme = createTheme({
    palette: {
        primary: {
            main: "#39B54A",
            light: "#D5E0D5",
            dark: "#707070"
        }
    },
    typography: {
        fontFamily: "Poppins",
        h4: {
            fontFamily: "Marcellus"
        },
        h5: {
            fontSize: 22,
            fontWeight: 500
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
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/editprofile' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        </Routes>
      </UserAuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
