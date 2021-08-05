// Adapted from https://next.material-ui.com/components/image-list/
import * as React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import useStyles from './useStyles';
import { Submission } from '../../../interface/Submission';
import { Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';

interface SubmissionListProps {
  submissionList: Submission[];
  setWinner: (submissionId: string) => void;
}

export function SubmissionsGrid({ submissionList, setWinner }: SubmissionListProps): JSX.Element {
  const classes = useStyles();
  const [selectedSubmission, setSelectedSubmission] = React.useState(submissionList[0]?._id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedSubmission(event.target.value);
  };
  setWinner(selectedSubmission);

  return (
    <ImageList cols={4}>
      {submissionList?.map((submission: Submission) =>
        submission.files?.map((_file: string) => (
          <ImageListItem key={_file}>
            <img
              srcSet={`${_file}?w=248&fit=crop&auto=format 1x,
                ${_file}?w=248&fit=crop&auto=format&dpr=2 2x`}
              loading="lazy"
              className={classes.image}
            />
            <Radio
              checked={selectedSubmission === submission._id}
              onChange={handleChange}
              value={submission._id}
              className={classes.radio}
            />

            <Link to={`/users/${submission.name}`} className={classes.caption}>
              <ImageListItemBar title={'By @' + submission.name} />
            </Link>
          </ImageListItem>
        )),
      )}
    </ImageList>
  );
}

interface SubmissionCountProps {
  submissionList?: Submission[];
}
export function submissionCount({ submissionList }: SubmissionCountProps): number {
  let length = 0;
  submissionList?.forEach((submission: Submission) => {
    if (submission.files) {
      length += submission.files.length;
    }
  });
  return length;
}
