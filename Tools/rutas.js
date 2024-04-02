const path = require('path');
const { v4: uuidv4 } = require('uuid');

const generateFileruta = (extension) => {
    const fileextension =  uuidv4() + '.' + extension;
    const rutaCompleta = path.join(__dirname, '..', 'archivos', fileextension);
    
    // Obtener el nombre de la carpeta y el nombre del archivo
    const folderName = path.basename(path.dirname(rutaCompleta));
    const fileName = path.basename(rutaCompleta);
    
    // Devolver solo el nombre de la carpeta y el nombre del archivo
    return path.join(folderName, fileName);
};

module.exports = generateFileruta;


/*const path = require('path');
const { v4: uuidv4 } = require('uuid');

const generateFileruta = (extension) => {
    const fileextension =  uuidv4() + '.' + extension
    return path.join(__dirname, '..', 'archivos',fileextension);
};

module.exports = generateFileruta;*/