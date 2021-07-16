// Adapted from https://next.material-ui.com/components/image-list/
import * as React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import SubmissionData from './SubmissionData';

export function SubmissionsGrid(): JSX.Element {
  const submissionList = SubmissionData();
  return (
    <ImageList cols={4}>
      {submissionList.map((submission) => (
        <ImageListItem key={submission.img}>
          <img
            srcSet={`${submission.img}?w=248&fit=crop&auto=format 1x,
                ${submission.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
          />
          <ImageListItemBar title={'@' + submission.username} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

// Replace with array of objects with img and username keys

export function submissionCount(): number {
  const submissionList = SubmissionData();
  return submissionList.length;
}
