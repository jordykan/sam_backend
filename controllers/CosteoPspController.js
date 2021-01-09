import models from '../models';

export default {
    add: async (req,res,next) => {
        try{
            const reg = await models.CosteoPsp.create(req.body);
            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message: "Ocurrio un Error",
            });
            next(e);
        }
    },
    list: async(req,res,next) => {
        try{
            const reg = await models.CosteoPsp.find()
            .populate('agencia')
            res.status(200).json(reg);
        }catch (e){
            res.status(500).send({
                message:"Ocurrio un Error"
            });
            next(e);
        }
    },
    listFechas: async(req,res,next) =>{
        try{
            let fecha1 = req.query.fecha1;
            let fecha2 = req.query.fecha2;

            const reg = await models.CosteoPsp.find({
                createdAt: { $gte: fecha1, $lte: fecha2 },
            
            }).populate('agencia')
            res.status(200).json(reg)
        }catch(e){
            res.status(500).send({
                message:"Ocurrio un error"
            });
            next();
        }
    }

}
