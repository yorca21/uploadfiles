const getFilename = (fileName) => {
    return fileName.split('.')[fileName.split('.').length - 1];
  };
  
  module.exports = getFilename;