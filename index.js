const bodyParser = require('body-parser')  //importamos el modulo  para analizar las solicitudes entrantes con el middleware body-parser en express
const express = require('express')        // importamos el modulo express nos proporciona una API para desarrollo 
const fileUpload = require('express-fileupload')  //importa el middleware  para una carga de archivos 
const app = express()                              // Crear una nueva instancia de la aplicación Express
const path = require('path')                       //Importar el módulo 'path' para trabajar con rutas de archivos y directorios
const { v4: uuidv4 } = require('uuid')             // nos ayuda a generar identificadores unicos  para cada archivo  

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

// maneja las solicitudes de archivos enviadas al servidor.
app.post('/', (req, res) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No se han enviado archivos.');
  }

  const files = req.files;
  
  const archivos = Object.keys(files) 

  archivos.forEach(file => {
    
    const extension = files[file].name.split('.')[files[file].name.split('.').length - 1];
    const ruta = path.join(__dirname, 'archivos', uuidv4() + '.' + extension)

    files[file].mv(ruta, (error) => {
      if (error)
        return res.status(500).json({
          status: 500,
          mensaje: ' Error en el almacenaje del archivo',
          error
        })
      return res.status(201).json({
        status: 201,
        mensaje: ' Archivo almacenado correctamente'
      });

    });

  });
})
app.listen(3000, function () {
  console.log('servidor es => https://localhost:3000')
});
