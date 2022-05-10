import './App.css';
import {BrowserRouter as Router, Routes, Route, HashRouter} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import EditProfile from './pages/EditProfile'
import ProtectedRoute from "./pages/ProtectedRoute"
import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import AddServices from './pages/AddServices';
import Profile from './pages/Profile';
import EditServices from './pages/EditServices';
import Service from './pages/Service';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Order from './pages/Order';

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
            fontWeight: 600
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
          <Route path='/profile/:userID' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path='/editprofile' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path='/addservices' element={<ProtectedRoute><AddServices /></ProtectedRoute>} />
          <Route path='/editservices/:serviceID' element={<ProtectedRoute><EditServices /></ProtectedRoute>} />
          <Route path='/service/:serviceID' element={<ProtectedRoute><Service /></ProtectedRoute>} />
          <Route path='/checkout/:serviceID/for/:userID/:sellerID' element={<ProtectedRoute><Checkout /></ProtectedRoute>}/>
          <Route path='/checkout/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}></Route>
          <Route path='/orders/:userID' element={<ProtectedRoute><Order/></ProtectedRoute>}></Route>
        </Routes>
      </UserAuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
