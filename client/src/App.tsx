import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import NewContest from './pages/Contest/NewContest';
import ContestDetails from './pages/ContestDetails/ContestDetails';
import Profile from './pages/Profile/Profile';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { ContestProvider } from './context/useContestContext';
import { NotificationsProvider } from './context/useNotificationsContext';
import { PaymentMethodsProvider } from './context/usePaymentsContext';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import NavBar from './components/NavBar/NavBar';
import NotificationsPage from './pages/Notifications/Notifications';
import { MessagingProvider } from './context/useMessagingContext';
import ContestPayment from './pages/ContestPayment/ContestPayment';
import './App.css';
import DesignSubmit from './components/DesignSubmit/DesignSubmit';
import ProfileSetting from './pages/ProfileSetting/ProfileSetting';
import Message from './pages/Message/Message';
import Discovery from './pages/Discovery/Discovery';
import ForgetPassword from './pages/ResetPassword/ForgetPassword/ForgetPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword/ResetPassword';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <PaymentMethodsProvider>
              <ContestProvider>
                <SocketProvider>
                  <MessagingProvider>
                    <NotificationsProvider>
                      <Route path="/" component={NavBar} />
                      <Route exact path="/" component={Discovery} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={Signup} />
                      <Route path="/email/reset-password/:token" component={ResetPassword} />
                      <Route exact path="/forget-password" component={ForgetPassword} />
                      <ProtectedRoute exact path="/file-upload/:id" component={DesignSubmit} />
                      <ProtectedRoute exact path="/users/:username" component={Profile} />
                      <ProtectedRoute exact path="/setting" component={ProfileSetting} />
                      <Route exact path="/discovery" component={Discovery} />
                      <ProtectedRoute exact path="/messages/:id" component={Message} />
                      <ProtectedRoute exact path="/messages" component={Message} />
                      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                      <ProtectedRoute exact path="/notifications" component={NotificationsPage} />
                      <ProtectedRoute exact path="/contest-details/:id" component={ContestDetails} />
                      <ProtectedRoute exact path="/contest-details/:id/payment" component={ContestPayment} />
                      <ProtectedRoute exact path="/profile" component={ProfileSetting} />
                      <ProtectedRoute exact path="/new-contest" component={NewContest} />
                      <ProtectedRoute exact path="/logout" component={Dashboard} />
                      <Route path="*">
                        <Redirect to="/" />
                      </Route>
                    </NotificationsProvider>
                  </MessagingProvider>
                </SocketProvider>
              </ContestProvider>
            </PaymentMethodsProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
