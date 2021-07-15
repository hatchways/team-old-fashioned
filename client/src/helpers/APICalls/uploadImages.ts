import { S3UploadAPIData } from '../../interface/S3Api';
import { FetchFormOptions } from '../../interface/FetchOptions';

export default async function uploadImagesAPI(data: FormData): Promise<S3UploadAPIData> {
  const S3FetchOptions: FetchFormOptions = {
    method: 'POST',
    body: data,
  };
  return await fetch(`/upload/uploadimage`, S3FetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: 'Unable to connect to server. Please try again',
    }));
}
