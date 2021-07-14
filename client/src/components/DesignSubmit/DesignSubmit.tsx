import { ChangeEvent, useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, CircularProgress, CardContent, CardHeader, Card } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useSnackBar } from '../../context/useSnackbarContext';
import uploadImageAPI from '../../helpers/APICalls/uploadImages';

import useStyles from './useStyles';
import { forEachChild } from 'typescript';
import { string } from 'yup/lib/locale';

export default function DesignSubmit(): JSX.Element {
  const classes = useStyles();
  const [uploadImages, setUploadImages] = useState<File>();
  const [uploadImagesList, setUploadImagesList] = useState<FileList>();
  const { updateSnackBarMessage } = useSnackBar();
  const [preview, setPreview] = useState<string>('');
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (uploadImages) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(uploadImages);
    } else {
      setPreview('');
    }
  }, [uploadImages]);

  const handleSelectedImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files?.length > 5) {
      return updateSnackBarMessage('Only can upload up to 5 images at once.');
    } else if (files?.length) {
      setUploadImages(files[0]);
      setUploadImagesList(files);
    }
  };

  const handleImageDelete = () => {
    setPreview('');
    setUploadImages(undefined);
  };

  const handleImageUpload = async () => {
    setisLoading(true);
    const formData = new FormData();
    if (uploadImagesList) {
      for (const img of uploadImagesList) {
        formData.append('designImg', img);
      }
    }
    const result = await uploadImageAPI(formData);
    if (result.error) {
      updateSnackBarMessage(result.error);
    }
    if (result.success) {
      updateSnackBarMessage('Your design images have been uploaded successfully');
    }
    setisLoading(false);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Submit design" component="h1" className={classes.cardHeader} />
      <CardContent className={classes.cardContent}>
        {preview ? (
          <Button variant="contained" component="label" className={classes.btn}>
            <img className={classes.preview} src={preview} />
          </Button>
        ) : (
          <Typography style={{ textAlign: 'center' }}>
            <Button variant="contained" component="label" className={classes.btn}>
              <input type="file" multiple accept="image/*" hidden onChange={handleSelectedImage} />
              <CloudUploadIcon className={classes.uploadIcon} />
            </Button>
          </Typography>
        )}
        {preview ? (
          <Button type="submit" disableFocusRipple disableRipple onClick={handleImageDelete}>
            <DeleteOutlineIcon />
            <Typography color="textSecondary">Delete</Typography>
          </Button>
        ) : null}
        <Typography color="textSecondary" className={classes.profileMediaInfo}>
          Click to choose a file
        </Typography>
        <Typography>High resolution images</Typography>
        <Typography>PNG, JPG, GIF</Typography>
        <Typography>(Maximum size is 3MB)</Typography>
        <Box>
          <Button
            type="submit"
            onClick={handleImageUpload}
            size="large"
            variant="contained"
            color="primary"
            className={classes.submitBtn}
          >
            {isLoading ? <CircularProgress /> : 'Submit'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
