// Adapted from https://next.material-ui.com/components/image-list/
import * as React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import useStyles from './useStyles';
import { Submission } from '../../../interface/Submission';
import { Link } from 'react-router-dom';

interface SubmissionListProps {
  submissionList?: Submission[];
}

export function SubmissionsGrid({ submissionList }: SubmissionListProps): JSX.Element {
  const classes = useStyles();
  return (
    <ImageList cols={4}>
      {submissionList?.map((submission: Submission) =>
        submission.files?.map((_file: string) => (
          <ImageListItem key={_file}>
            <img
              srcSet={`${_file}?w=248&fit=crop&auto=format 1x,
                ${_file}?w=248&fit=crop&auto=format&dpr=2 2x`}
              loading="lazy"
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

export function submissionCount({ submissionList }: SubmissionListProps): number {
  let length = 0;
  submissionList?.forEach((submission: Submission) => {
    if (submission.files) {
      length += submission.files.length;
    }
  });
  return length;
}
