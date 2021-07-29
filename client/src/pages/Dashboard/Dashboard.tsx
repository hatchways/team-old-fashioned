// import Grid from '@material-ui/core/Grid';
// import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { Link } from 'react-router-dom';

export default function Dashboard(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    //initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <div>
      <AuthHeader linkTo="/fileUpload" asideText="testing upload file page" btnText="open uploadFile page" />
      {/* hard coding contest id, should fetch contest ID in Dashboard */}
      <Link to="/contest-details/60fa08e84f14460a342ad347">Contest Details</Link>
    </div>
  );
}
