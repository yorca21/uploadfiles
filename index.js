 const bodyParser = require('body-parser')
 const express = require('express')
 const fileUpload = require ('express-fileupload')
 const app = express()
 const path = require('path')
 const { v4 : uuidv4 } = require('uuid')

 app.use(express.json())
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended: true}))

 app.use(fileUpload());
 
 app.post('/', (req, res) => {
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No se han enviado archivos.');
  }

  const files = req.files.files;
  const filesArray = Array.isArray(files) ? files : [files];

  filesArray.forEach(file => {
    
    const extension = file.name.split('.')[file.name.split('.').length - 1];
    const ruta = path.join(__dirname, 'uploads', uuidv4() + '.' + extension)
    
    file.mv(ruta ,(error)  => {
       if(error)
      
       return res.status(500).json({
        status : 500 ,
        mensaje : ' Error en el almacenaje del archivo',
        error
      })
    });
  });
  return res.status(201).json({
    status : 201,
    mensaje : ' Archivo almacenado correctamente'
});

/*app.post('/', (req, res)=>{
  if(!req.files || Object.keys(req.files).length === 0){
    return res.status(400).send('No se cargó ningún archivo.')
  }
   const ArchivoEjemplo = req.files.archivo
   const extension = ArchivoEjemplo.name.split('.')[ArchivoEjemplo.name.split('.').length -1]
  
   const ruta = path.join(__dirname, 'archivos', uuidv4() + '.' + extension)
   ArchivoEjemplo.mv( ruta, (error) =>{
     if(error)
       return res.status(500).json({
         status : 500 ,
         mensaje : ' Error en el almacenaje del archivo',
         error
  })
  return res.status(201).json({
    status : 201,
    mensaje : ' Archivo almacenado correctamente'
   })
 })*/
  
 })
 app.listen(3000 , function() {
   console.log('servidor es => https://localhost:3000')
});