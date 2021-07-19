// Adapted from https://next.material-ui.com/components/image-list/
import * as React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import useStyles from './useStyles';

interface Props {
  submissionList: Array<{ img: string; username: string }>;
}
export function SubmissionsGrid({ submissionList }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <ImageList cols={4}>
      {submissionList.map((submission: { img: string; username: string }) => (
        <ImageListItem key={submission.img}>
          <img
            srcSet={`${submission.img}?w=248&fit=crop&auto=format 1x,
                ${submission.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
          />
          <ImageListItemBar title={'By @' + submission.username} className={classes.caption} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export function submissionCount({ submissionList }: Props): number {
  return submissionList.length;
}
