export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  console.log({ file });
  if (!file) return callback(new Error('File is emty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif'];

  if (allowedExtensions.includes(fileExtension)) {
    return callback(null, true);
  }

  callback(null, false);
};
