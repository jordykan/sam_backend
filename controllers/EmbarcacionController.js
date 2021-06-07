import models from '../models';
import fs from 'fs'
import path from 'path'

export default {
    add: async(req,res,next)=>{
        try{
            const reg = await models.Embarcacion.create(req.body);
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
            const reg = await models.Embarcacion.findOne({_id:req.query._id});
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
    queryDatos: async(req,res,next)=>{
        try{
            const reg = await models.Embarcacion.findOne({_id:req.query._id});
            if(!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
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
    list: async(req,res,next)=>{
        try{
            let valor = req.query.valor;
            const reg = await models.Embarcacion.find({'nombre':new RegExp(valor,'i')},{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
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
            const reg = await models.Embarcacion.find({'estado':1})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },

    listFecha: async(req,res,next)=>{
        try{
            let fecha1=req.query.fecha1;
            let fecha2=req.query.fecha2;
           
            const reg = await models.Embarcacion.find({$and:[{createdAt:{$gte : fecha1 , $lte : fecha2}}]})
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
            const reg = await models.Embarcacion.findByIdAndUpdate({_id:req.body._id},{nombre:req.body.nombre,eslora:req.body.eslora,
            manga: req.body.manga, tbr: req.body.tbr, matricula: req.body.matricula, calado: req.body.calado, bandera:req.body.bandera,pto_matricula:req.body.pto_matricula,trn:req.body.trn,puntal:req.body.puntal,imo:req.body.imo, tipo: req.body.tipo,armador:req.body.armador,certificado_a:req.body.certificado_a});
            res.status(200).json(reg)
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },
    upload: async (req,res,next)=>{
        try{
            // Recoger el fichero de la petición
        var file_name = 'Imagen no subida...';

       

        // Conseguir nombre y la extensión del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // * ADVERTENCIA * EN LINUX O MAC
        // var file_split = file_path.split('/');

        // Nombre del archivo
        var file_name = file_split[2];

        // Extensión del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        var id = req.params._id
        const reg = await models.Embarcacion.findOneAndUpdate({_id: id}, {certificado_a: file_name})
           res.status(200).json(reg)

        // Comprobar la extension, solo imagenes, si es valida borrar el fichero
       
    }catch(e){
        res.status(500).send({
            message:'Ocurrio un error'
        });
        next(e);
    }
    },

    getCertificado: (req, res) => {
        var archivos = req.params.archivo;
        var path_file = './uploads/certificado_a/'+archivos;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe !!!'
                });
            }
        });
    },

    remove: async(req,res,next)=>{
        try{
            const reg = await models.Embarcacion.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },
    activate: async(req,res,next)=>{
        try{
            const reg = await models.Embarcacion.findByIdAndUpdate({_id:req.body._id},{estado:1});
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
            const reg = await models.Embarcacion.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg)
        }catch(e){
            res.status(500).send({
                messaje:'Ocurrio un error'
            });
            next(e);
        }
    },
  
}