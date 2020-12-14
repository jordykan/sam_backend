import models from '../models';
import bcrypt from 'bcryptjs';
import token from '../services/token'

export default {
    add: async(req,res,next)=>{
        try{
            req.body.password = await bcrypt.hash(req.body.password,10);
            const reg = await models.Usuario.create(req.body);
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
            const reg = await models.Usuario.findOne({_id:req.query._id})
            .populate('agencia');
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
            const reg = await models.Usuario.find({'nombre':new RegExp(valor,'i')},{createdAt:0})
            .sort({'createdAt':-1})
            .populate('agencia')
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
            const reg = await models.Usuario.find({estado:1})
            .sort({'createdAt':-1})
            .populate('agencia')
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
            let pas = req.body.password;
            const reg0 = await models.Usuario.findOne({_id:req.body._id});
            if(pas!=reg0.password){
                req.body.password = await bcrypt.hash(req.body.password,10); 
            }
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{nombre:req.body.nombre,empresa:req.body.empresa,cargo:req.body.cargo,
            rol: req.body.rol, email: req.body.email, direccion: req.body.direccion, telefono: req.body.telefono, password: req.body.password,agencia:req.body.agencia});
            res.status(200).json(reg)
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },  
    updatePassword: async(req,res,next)=>{
        try{
            let pas = req.body.password;
            const reg0 = await models.Usuario.findOne({_id:req.body._id});
            if(pas!=reg0.password){
                req.body.password = await bcrypt.hash(req.body.password,10); 
            }
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{password: req.body.password});
            res.status(200).json(reg)
        }catch(e){
            res.status(500).send({
                message:'Ocurrio un error'
            });
            next(e);
        }
    },
    remove: async(req,res,next)=>{
        try{
            const reg = await models.Usuario.findByIdAndDelete({_id:req.body._id});
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
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:1});
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
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg)
        }catch(e){
            res.status(500).send({
                messaje:'Ocurrio un error'
            });
            next(e);
        }
    },
    login: async(req,res,next)=>{
        try{
            let user = await models.Usuario.findOne({email:req.body.email,estado:1})
            if(user){
                //Existe un usuario con el email
                let match = await  bcrypt.compare(req.body.password,user.password);
                if(match){
                    let tokenReturn = await token.encode(user._id,user.rol,user.email,user.nombre,user.agencia);
                    res.status(200).json({user,tokenReturn});
                }else{
                    res.status(404).send({
                        message: 'Password incorrecto'
                    })
                }
            }else{
                res.status(404).send({
                    message: 'No existe el usuario'
                });
            }
        }catch(e){
            res.status(500).send({
                messaje:'Ocurrio un error'
            });
            next(e);
        }
    }
}