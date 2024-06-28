export const validateFileType = (fileName: string): boolean => {
    const allowedExtensions = ['.txt', '.yaml', '.yml'];
    const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };