export interface S3UploadAPIData {
  error?: { message: string };
  success?: UploadAPIDataSuccess;
}

export interface UploadAPIDataSuccess {
  message: string;
  urlArray: string[];
}
