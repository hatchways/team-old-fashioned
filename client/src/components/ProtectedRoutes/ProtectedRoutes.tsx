import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

interface Props extends RouteProps {
  component: React.ComponentType;
}

const ProtectedRoute = ({ component: Component, ...rest }: Props): JSX.Element => {
  const { loggedInUser } = useAuth();
  return (
    <Route
      render={(props) => (loggedInUser ? <Component {...rest} {...props} /> : <Redirect to="/login" />)}
      {...rest}
    />
  );
};
export default ProtectedRoute;
