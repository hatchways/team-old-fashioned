import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import NavBar from './components/NavBar/NavBar';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              {/* Renders navbar for all pages */}
              <Route path="/" component={NavBar} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <Route path="*">
                <Redirect to="/login" />
              </Route>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
