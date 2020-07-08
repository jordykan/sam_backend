import models from '../models';


export default {
    add: async(req,res,next)=>{
        try{
            const reg = await models.Pasajeros.create(req.body);
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },
    query: async(req,res,next)=>{
        try{
            const reg = await models.Pasajeros.findOne({_id:req.query._id});
            if(!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            }else{
                res.status(200).json(reg.nombre); 
            }
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },
    list: async(req,res,next)=>{
        try{
            let valor = req.query.valor
            let agencia = req.query.agencia
            const reg = await models.Pasajeros.find({$or:[{'nombre_completo':new RegExp(valor,'i')},{'rfc':new RegExp(valor,'i')}],agencia:agencia})
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },

   

    busquedaRfc: async(req,res,next)=>{
        try{
            const reg = await models.Pasajeros.findOne({rfc:req.query.rfc})
           
            if(!reg){
                res.status(404).send({
                    message: 'el registro no existe'
                })
            
            }else{
                res.status(200).json(reg);
            }
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },

    listActivos: async(req,res,next)=>{
        try{
            let valor = req.query.valor;
            const reg = await models.Pasajeros.find({'estado':1})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },

 
    

    update: async(req,res,next)=>{
        try{
            const reg = await models.Pasajeros.findByIdAndUpdate({_id:req.body._id},{rfc:req.body.rfc,nombre_completo:req.body.nombre_completo,
            numero_libreta: req.body.numero_libreta, nss: req.body.nss,compania:req.body.compania,puesto:req.body.puesto});
            res.status(200).json(reg)
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },
    

  

   
    activate: async(req,res,next)=>{
        try{
            const reg = await models.Pasajeros.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg)

        }catch(e){
            res.status(500).send({
                messaje:'Ocurrio un error'
            });
            next(e);
        }
    },
    deactivate: async(req,res,next)=>{
        try{
            const reg = await models.Pasajeros.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg)
        }catch(e){
            res.status(500).send({
                messaje:'Ocurrio un error'
            });
            next(e);
        }
    },
  
}