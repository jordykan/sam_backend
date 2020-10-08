import models from "../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.BitacoraEmbarcacion.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },

  list: async (req, res, next) => {
    try {
      const reg = await models.BitacoraEmbarcacion.find({ $and: [
        { embarcacion: req.query.embarcacion },
        { mesCaptura: req.query.fecha },
      ],
    })
        .populate("agencia")
        .populate("embarcacion")
        .sort({ createdAt: -1 });
      res.status(200).json(reg);
    } catch (e) { 
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
 
  update: async (req, res, next) => {
    try {
      const reg = await models.BitacoraEmbarcacion.findByIdAndUpdate(
        { _id: req.body._id },
        {
          folioServicio: req.body.folioServicio,
          agencia: req.body.agencia,
          atraque: req.body.atraque,
          desatraque: req.body.desatraque,
          estadia: req.body.estadia,
          embarquePx: req.body.embarquePx,
          desembarquePx: req.body.desembarquePx,
          entrada: req.body.entrada,
          salida: req.body.salida,
          mesCaptura:req.body.mesCaptura
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },


};
