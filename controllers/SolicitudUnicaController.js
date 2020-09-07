import models from "../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.SolicitudUnica.create(req.body)

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },

  query: async (req, res, next) => {
    try {
      const reg = await models.SolicitudUnica.findOne({ _id: req.query._id })
        .populate("embarcacion")
        .populate("usuario");

      if (!reg) {
        res.status(404).send({
          message: "El registro no existe",
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.SolicitudUnica.find({ usuario: valor })
        .sort({ createdAt: -1 })
        .populate("embarcacion")
        .populate("usuario");
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },

  listAdmin: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.SolicitudUnica.find()
        .sort({ createdAt: -1 })
        .populate({
          path: "usuario",
          model: "usuario",
          populate: {path:"agencia",model:"agencia"}
        })
        .populate("embarcacion")
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
      const reg = await models.SolicitudUnica.findByIdAndUpdate(
        { _id: req.body._id },
        {
          procedencia: req.body.procedencia,
          eta: req.body.eta,
          etd: req.body.etd,
          infraestructura: req.body.infraestructura,
          embarcacion: req.body.embarcacion,
          usuario: req.body.usuario,
          comentarios: req.body.comentarios,
          estado: 0,
          motivo_cancelacion: "",
          capitan: req.body.capitan,
          no_tripulantes: req.body.no_tripulantes,
          servicios_portuarios: req.body.servicios_portuarios,
          operacion_descarga: req.body.operacion_descarga,
          total_toneladas: req.body.total_toneladas,
          observaciones: req.body.observaciones,
          tipo_carga: req.body.tipo_carga,
          otros_servicios: req.body.otros_servicios,
          operacion_carga: req.body.operacion_carga,
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
  remove: async (req, res, next) => {
    try {
      const reg = await models.SolicitudUnica.findByIdAndDelete({
        _id: req.body._id,
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      var fecha = Date.now();
      const reg = await models.SolicitudUnica.findByIdAndUpdate(
        { _id: req.body._id },
        {
          estado: 1,
          aprobacionAmls: req.body.aprobacionAmls,
          fechaAprobacion: fecha,
        }
      )
      .populate("usuario");
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        messaje: "Ocurrio un error",
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.SolicitudUnica.findByIdAndUpdate(
        { _id: req.body._id },
        {
          estado: 2,
          aprobacionAmls: "",
          motivo_cancelacion: req.body.motivo_cancelacion,
          fechaAprobacion: null,
        }
      )
      .populate("usuario");
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        messaje: "Ocurrio un error",
      });
      next(e);
    }
  },

  deactivateApi: async (req, res, next) => {
    try {
      const reg = await models.SolicitudUnica.findByIdAndUpdate(
        { _id: req.body._id },
        { 
          estado: 2, 
          aprobacionApia: req.body.aprobacionApi,
          motivo_cancelacion: req.body.motivo_cancelacion,
          fechaAprobacion:null
        }
      )
      .populate("usuario");
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        messaje: "Ocurrio un error",
      });
      next(e);
    }
  },

  aprobarApi: async (req, res, next) => {
    try {
      const reg = await models.SolicitudUnica.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 3, aprobacionApi: req.body.aprobacionApi }
      )
      .populate("usuario");
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        messaje: "Ocurrio un error",
      })
      .populate("usuario");
      next(e);
    }
  },
  listarSUPorUsuario: async (req, res, next) => {
    try {
      let fecha1 = req.query.fecha1;
      let fecha2 = req.query.fecha2;
      let usuario = req.query.usuario;
      const reg = await models.SolicitudUnica.find({
        $and: [
          { usuario: usuario },
          { createdAt: { $gte: fecha1, $lte: fecha2 } },
        ],
      })
      .populate({
        path: "usuario",
        model: "usuario",
        populate: {path:"agencia",model:"agencia"}
        
      })
        .populate("embarcacion")
       
        res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  listarSUPorAgencia: async (req, res, next) => {
    try {
      let fecha1 = req.query.fecha1;
      let fecha2 = req.query.fecha2;
      let usuario = req.query.usuario;
      const reg = await models.SolicitudUnica.find({
        $and: [
          { 'embarcacion.nombre' : usuario },
          { createdAt: { $gte: fecha1, $lte: fecha2 } },
        ],
      })
      
      .populate({
        path: "usuario",
        model: "usuario",
        populate: {path:"agencia",model:"agencia"}
        
      })
      .populate("embarcacion");
      
        res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  }
};


//REPORTES

