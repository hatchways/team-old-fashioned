import { ChangeEvent, useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, CardContent, CardHeader, Card } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useSnackBar } from '../../context/useSnackbarContext';
import uploadImageAPI from '../../helpers/APICalls/uploadImages';
import contestImgSubmitAPI from '../../helpers/APICalls/contest';
import { useSocket } from '../../context/useSocketContext';

import useStyles from './useStyles';
import { RouteComponentProps } from 'react-router-dom';

const DesignSubmit = ({ match }: RouteComponentProps): JSX.Element => {
  const classes = useStyles();
  const [uploadImages, setUploadImages] = useState<File>();
  const [uploadImagesList, setUploadImagesList] = useState<FileList>();
  const { updateSnackBarMessage } = useSnackBar();
  const [preview, setPreview] = useState<string>('');
  const [isLoading, setisLoading] = useState(false);
  const [contestId, setContestId] = useState<string>('');
  const { socket } = useSocket();

  useEffect(() => {
    const params = match.params as { id: string };
    setContestId(params.id);
    if (uploadImages) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(uploadImages);
    } else {
      setPreview('');
    }
  }, [uploadImages, match]);

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
      updateSnackBarMessage(result.error.message);
    }
    if (result.success) {
      updateSnackBarMessage('Your design images have been uploaded successfully');
    }
    if (result.success) {
      const returnData = await contestImgSubmitAPI(contestId, result.success.urlArray);
      if (socket) {
        socket.emit('create notification', { returnData, type: 'submission' });
      }
    }
    setisLoading(false);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader title="Submit design" component="h1" className={classes.cardHeader} />
        <CardContent className={classes.cardContent}>
          {preview ? (
            <Button variant="contained" component="label" className={classes.btn}>
              <img className={classes.preview} src={preview} />
            </Button>
          ) : (
            <Typography>
              <Button variant="contained" component="label" className={classes.btn}>
                <input type="file" multiple accept="image/*" hidden onChange={handleSelectedImage} />
                <CloudUploadIcon color="disabled" className={classes.uploadIcon} />
              </Button>
            </Typography>
          )}
          {preview ? (
            <Button type="submit" disableFocusRipple disableRipple onClick={handleImageDelete}>
              <DeleteOutlineIcon />
              <Typography color="primary">Delete</Typography>
            </Button>
          ) : null}
          <Typography variant="h5" display="block" className={classes.submitText} gutterBottom>
            Click to choose a file
          </Typography>
          <Typography color="textSecondary">High resolution images</Typography>
          <Typography color="textSecondary">PNG, JPG, GIF</Typography>
          <Typography color="textSecondary">(Maximum size is 3MB)</Typography>
        </CardContent>
      </Card>
      <Box>
        <Button
          type="submit"
          onClick={handleImageUpload}
          size="large"
          variant="contained"
          color="primary"
          className={classes.submitBtn}
        >
          {isLoading ? <CircularProgress /> : 'SUBMIT'}
        </Button>
      </Box>
    </div>
  );
};

export default DesignSubmit;
