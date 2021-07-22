import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import NewContest from './pages/Contest/NewContest';
import ContestDetails from './pages/ContestDetails/ContestDetails';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import NavBar from './components/NavBar/NavBar';
import NotificationsPage from './pages/Notifications/Notifications';

import './App.css';
import DesignSubmit from './components/DesignSubmit/DesignSubmit';
import ProfileSetting from './pages/ProfileSetting/ProfileSetting';

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
              <ProtectedRoute exact path="/fileUpload" component={DesignSubmit} />
              <ProtectedRoute exact path="/setting" component={ProfileSetting} />
              {/* Replace component with Discovery Page */}
              <Route exact path="/" component={Dashboard} />
              {/* Replace the components once created */}
              <ProtectedRoute exact path="/messages" component={Dashboard} />
              <ProtectedRoute exact path="/notifications" component={NotificationsPage} />
              {/* Update to "/contest/:id" once contest db has been set up*/}
              <ProtectedRoute exact path="/contest-details" component={ContestDetails} />
              <ProtectedRoute exact path="/profile" component={ProfileSetting} />
              <ProtectedRoute exact path="/new-contest" component={NewContest} />
              <ProtectedRoute exact path="/logout" component={Dashboard} />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
