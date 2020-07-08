import models from '../models';

export default {
  
    listarCGPorUsuario: async(req,res,next)=>{
        try{
            
            const reg = await models.CambioGuardia.find()
            .populate('embarcacion')
            .populate('agencia')
            .populate('usuario')
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },

    listAgencianCG: async(req,res,next)=>{
        try{
            let fecha1=req.query.fecha1
            let fecha2=req.query.fecha2
            let agencias=req.query.agencia
            const agencia = await models.Usuario.findOne({'agencia':agencias})
            const reg = await models.CambioGuardia.find({$and:[{'usuario':agencia._id},{fecha:{$gte : fecha1 , $lte : fecha2}}]})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },

    listEmbarcacionCG: async(req,res,next)=>{
        try{
            let fecha1=req.body.fecha1
            let fecha2=req.body.fecha2
            let embarcacion = req.body.embarcacion
            const reg = await models.CambioGuardia.find({$and:[{'embarcacion':embarcacion},{fecha:{$gte : fecha1 , $lte : fecha2}}]})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    }

}