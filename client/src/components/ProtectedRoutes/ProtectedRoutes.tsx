import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

interface RouteProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  path?: string;
}

const ProtectedRoute = ({ component: Component, ...rest }: RouteProps): JSX.Element => {
  const { loggedInUser } = useAuth();
  return (
    <Route
      render={(props) => (loggedInUser ? <Component {...rest} {...props} /> : <Redirect to="/login" />)}
      {...rest}
    />
  );
};
export default ProtectedRoute;
