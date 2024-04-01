const path = require('path');
const { v4: uuidv4 } = require('uuid');

const generateFileruta = (extension) => {
    const fileextension =  uuidv4() + '.' + extension
    return path.join(__dirname, '..', 'archivos',fileextension);
};

module.exports = generateFileruta;
 