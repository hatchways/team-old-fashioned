import { FunctionComponent } from 'react';
import PersonalInformationForm from './PersonalInformationForm/PersonalInformationForm';
import useStyles from './useStyles';

const PersonalInformation: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();

  return <PersonalInformationForm />;
};

export default PersonalInformation;
