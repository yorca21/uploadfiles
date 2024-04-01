
const move_File = (ruta, files, file) => {
    return new Promise((resolve, reject) => {
      files[file].mv(ruta, (error) => {
        if (error) {
          reject(error); // Rechaza la promesa con el error
        } else {
          resolve(); // Resuelve la promesa sin argumentos si la operación es exitosa
        }
      });
    });
  };
   module.exports = move_File;