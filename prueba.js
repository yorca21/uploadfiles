 
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
