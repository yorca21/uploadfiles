const bodyParser = require('body-parser')  //importamos el modulo  para analizar las solicitudes entrantes con el middleware body-parser en express
const express = require('express')        // importamos el modulo express nos proporciona una API para desarrollo 
const fileUpload = require('express-fileupload')  //importa el middleware  para una carga de archivos 
const app = express()                              // Crear una nueva instancia de la aplicación Express
const path = require('path');

const getFilename = require('./Tools/Filename');
const generateFileruta = require('./Tools/rutas');
const move_File = require('./Tools/moveFile');
const { crearTablaArchivos, insertarArchivo } = require('./Tools/database');



//analizar las solicitudes entrantes en formato JSON y lo convierte en un objeto JavaScript
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// maneja la carga de archivos , espaecificamos que que se va habilitar la opcion archivos temporales 
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
//espesificamos el intervalo de tiempo que los archivos van a estar en los archivos temporales 
setInterval(() => {
  fileUpload.cleanUp('/tmp/');    // cleanup limpia los archivos temporales del directorio especificado. 
}, 86400000); // 86400000 milisegundos = 24 horas tiempo de permanencia 

// Llamar a la función para crear la tabla 
crearTablaArchivos().catch(error => 

  console.error('Error al crear la tabla de archivos:', error)
);

app.post('/', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No se han enviado archivos.');
    }

    const files = req.files;
    const archivos = Object.keys(files);
    
    // Crear un array para almacenar las promesas de movimiento de archivos
    const promises = [];

    // Iterar sobre cada archivo y agregar una promesa al array
    archivos.forEach((file) => {
      
      const extension = getFilename(files[file].name);
      const ruta = generateFileruta(extension);
      
      // Agregar la promesa al array
      promises.push(move_File(ruta, files, file, res));
      
      // Insertar información del archivo en la base de datos
       const nombre = files[file].name;
       const peso = files[file].size; // Tamaño en bytes
       const nombreCarpeta = path.basename(path.dirname(ruta)); // Obtener el nombre de la carpeta
       
       insertarArchivo(nombre, extension, peso, nombreCarpeta)
       .catch(error =>
         // Manejar cualquier error que pueda ocurrir
         console.error('Error al insertar archivo en la base de datos:', error));
     
    });

    // Esperar a que todas las promesas se resuelvan
    await Promise.all(promises);

    // Enviar una respuesta si todas las operaciones se completaron correctamente
    return res.status(201).json({
      status: 201,
      mensaje: 'Archivos almacenados correctamente'
    });
  } catch (error) {
    // Manejar cualquier error que pueda ocurrir durante el procesamiento de las solicitudes de archivo
    console.error('Error al procesar las solicitudes de archivo:', error);
    return res.status(500).json({
      status: 500,
      mensaje: 'Error en el servidor'
    });
  }
});
app.listen(3000, function () {
  console.log('servidor es => https://localhost:3000')
});
