import models from "../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.CambioGuardia.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
  listarCGPorUsuario: async (req, res, next) => {
    try {
      let fecha1 = req.query.fecha1;
      let fecha2 = req.query.fecha2;
      let usuario = req.query.usuario;
      const reg = await models.CambioGuardia.find({
        $and: [
          { usuario: usuario },
          { createdAt: { $gte: fecha1, $lte: fecha2 } },
        ],
      })
        .populate("embarcacion")
        .populate("usuario")
        .populate("usuario","agencia")
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },

  listarCGPorEstado: async (req, res, next) => {
    try {
      let fecha1 = req.query.fecha1;
      let fecha2 = req.query.fecha2;
      let estado = req.query.estado;
      const reg = await models.CambioGuardia.find({
        $and: [
          { estado: estado },
          { createdAt: { $gte: fecha1, $lte: fecha2 } },
        ],
      })
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
  listarCGPorMuelle: async (req, res, next) => {
    try {
      let fecha1 = req.query.fecha1;
      let fecha2 = req.query.fecha2;
      let muelle = req.query.muelle;
      const reg = await models.CambioGuardia.find({
        $and: [
          { muelle: muelle },
          { createdAt: { $gte: fecha1, $lte: fecha2 } },
        ],
      })
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

  listarCGPorEmbarcacion: async (req, res, next) => {
    try {
      let fecha1 = req.query.fecha1;
      let fecha2 = req.query.fecha2;
      let embarcacion = req.query.embarcacion;
      const reg = await models.CambioGuardia.find({
        $and: [
          { embarcacion: embarcacion },
          { createdAt: { $gte: fecha1, $lte: fecha2 } },
        ],
      })
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

  listFecha: async (req, res, next) => {
    try {
      let fecha1 = req.query.fecha1;
      let fecha2 = req.query.fecha2;

      const reg = await models.CambioGuardia.find({
        createdAt: { $gte: fecha1, $lte: fecha2 },
      })
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

  query: async (req, res, next) => {
    try {
      const reg = await models.CambioGuardia.findOne({ _id: req.query._id })
        .populate("usuario", { nombre: 1 })
        .populate("embarcacion", { nombre: 1 })
        .populate("agencia", { nombre: 1 });

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
      const reg = await models.CambioGuardia.find({ usuario: valor })
        .populate("usuario")
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

  listBitacora: async (req, res, next) => {
    try {
      const reg = await models.CambioGuardia.find({$or:[{estado: 3},{estado:4}]})
        .populate("usuario")
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

  listAdmin: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.CambioGuardia.find()
        .populate("usuario")
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
  listFecha: async (req, res, next) => {
    try {
      let fecha1 = req.query.fecha1;
      let fecha2 = req.query.fecha2;

      const reg = await models.CambioGuardia.find({
        $and: [{ fecha: { $gte: fecha1, $lte: fecha2 } }],
      })
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
  update: async (req, res, next) => {
    try {
      const reg = await models.CambioGuardia.findByIdAndUpdate(
        { _id: req.body._id },
        {
          folio: req.body.folio,
          usuario: req.body.usuario,
          fecha: req.body.fecha,
          embarcacion: req.body.embarcacion,
          detalles: req.body.detalles,
          pasajeros: req.body.pasajeros,
          muelle: req.body.muelle,
          adjunto: req.body.adjunto,
          estado: 0,
          compania: req.body.compania,
          tipo: req.body.tipo,
         
          operacion: req.body.operacion,
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

  updatePassengers: async (req, res, next) => {
    try {
      const reg = await models.CambioGuardia.findByIdAndUpdate(
        { _id: req.body._id },
        { pasajeros: req.body.pasajeros,estado:4 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },

  upload: async (req, res, next) => {
    try {
      // Recoger el fichero de la petición
      var file_name = "Imagen no subida...";

      // Conseguir nombre y la extensión del archivo
      var file_path = req.files.file0.path;
      var file_split = file_path.split("\\");

      // * ADVERTENCIA * EN LINUX O MAC
      // var file_split = file_path.split('/');

      // Nombre del archivo
      var file_name = file_split[2];

      // Extensión del fichero
      var extension_split = file_name.split(".");
      var file_ext = extension_split[1];

      var id = req.params._id;
      const reg = await models.CambioGuardia.findOneAndUpdate(
        { _id: id },
        { vehiculos: file_name }
      );
      res.status(200).json(reg);

      // Comprobar la extension, solo imagenes, si es valida borrar el fichero
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },

  remove: async (req, res, next) => {
    try {
      const reg = await models.Embarcacion.findByIdAndDelete({
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
      const reg = await models.CambioGuardia.findByIdAndUpdate(
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
      const reg = await models.CambioGuardia.findByIdAndUpdate(
        { _id: req.body._id },
        {
          estado: 2,
          aprobacionAmls: req.body.aprobacionAmls,
          motivo_cancelacion: req.body.motivo_cancelacion,
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
      const reg = await models.CambioGuardia.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 2, 
          aprobacionApi: req.body.aprobacionApi,
          motivo_cancelacion: req.body.motivo_cancelacion
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
  confirmarApi: async (req, res, next) => {
    try {
      const reg = await models.CambioGuardia.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 3, aprobacionApi: req.body.aprobacionApi }
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
};
