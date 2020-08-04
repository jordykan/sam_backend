import models from "../models";
import fs from "fs";
import path from "path";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.VehiculoPersonal.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },

  addVehiculos: async (req, res, next) => {
    try {
      const reg = await models.Vehiculos.insertMany(req.body);
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
      const reg = await models.VehiculoPersonal.findOne({ _id: req.query._id })
        .populate("usuario", { nombre: 1 })
        .populate("embarcacion", { nombre: 1 });

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
      const reg = await models.VehiculoPersonal.find()
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

  actualizar: async (req, res, next) => {
    try {
      const reg = await models.VehiculoPersonal.findByIdAndUpdate(
        { _id: req.body._id },
        {
          estado: 0,
          embarcacion: req.body.embarcacion,
          muelle: req.body.muelle,
          fecha: req.body.fecha,
          pasajeros: req.body.pasajeros,
          vehiculos: req.body.vehiculos,
          manifiesto: req.body.manifiesto,
          vehiculos_adj: req.body.vehiculos_adj,
          personal_adj: req.body.personal_adj,
          detalles: req.body.detalles,
          tipo: req.body.tipo,
          compania: req.body.compania,
          ingreso_mat: req.body.ingreso_mat,
          retiro_mat: req.body.retiro_mat,
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

  update: async (req, res, next) => {
    try {
      var file_name = "Imagen no subida...";

      var file_path = req.files.file1.path;
      var file_split = file_path.split("\\");

      var file_name = file_split[2];

      var extension_split = file_name.split(".");
      var file_ext = extension_split[1];

      var id = req.params._id;
      const reg = await models.VehiculoPersonal.findOneAndUpdate(
        { _id: id },
        { manifiesto: file_name }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },

  updateVehiculos: async (req, res, next) => {
    try {
      var file_name = "Imagen no subida...";

      var file_path = req.files.file0.path;
      var file_split = file_path.split("\\");

      var file_name = file_split[2];

      var extension_split = file_name.split(".");
      var file_ext = extension_split[1];

      var id = req.params._id;
      const reg = await models.VehiculoPersonal.findOneAndUpdate(
        { _id: id },
        { vehiculos_adj: file_name }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },

  updatePersonal: async (req, res, next) => {
    try {
      var file_name = "Imagen no subida...";

      var file_path = req.files.file3.path;
      var file_split = file_path.split("\\");

      var file_name = file_split[2];

      var extension_split = file_name.split(".");
      var file_ext = extension_split[1];

      var id = req.params._id;
      const reg = await models.VehiculoPersonal.findOneAndUpdate(
        { _id: id },
        { personal_adj: file_name }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },

  getAccesoManifiesto: (req, res) => {
    var archivos = req.params.archivo;
    var path_file = "./uploads/accesos/" + archivos;

    fs.exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(404).send({
          status: "error",
          message: "La imagen no existe !!!",
        });
      }
    });
  },

  getAccesoPersonal: (req, res) => {
    var archivos = req.params.archivo;
    var path_file = "./uploads/accesos/" + archivos;

    fs.exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(404).send({
          status: "error",
          message: "La imagen no existe !!!",
        });
      }
    });
  },

  getAccesoVehiculo: (req, res) => {
    var archivos = req.params.archivo;
    var path_file = "./uploads/accesos/" + archivos;

    fs.exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(404).send({
          status: "error",
          message: "La imagen no existe !!!",
        });
      }
    });
  },

  listAdmin: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.VehiculoPersonal.find()
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

  upload: async (req, res, next) => {
    try {
      const reg = await models.VehiculoPersonal.update(
        { _id: req.body._id },
        { pasajeros: req.body.pasajeros }
      );
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
      const reg = await models.VehiculoPersonal.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1,
          aprobacionAmls: req.body.aprobacionAmls ,
          fechaAprobacion: fecha
        }
      );
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
      const reg = await models.VehiculoPersonal.findByIdAndUpdate(
        { _id: req.body._id },
        {
          estado: 2,
          aprobacionAmls: req.body.aprobacionAmls,
          motivo_cancelacion: req.body.motivo_cancelacion,
        }
      );
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
      const reg = await models.VehiculoPersonal.findByIdAndUpdate(
        { _id: req.body._id },
        { 
          estado: 2,
          aprobacionApi: req.body.aprobacionApi,
          motivo_cancelacion:req.body.motivo_cancelacion

        }
      );
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
      const reg = await models.VehiculoPersonal.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 3, aprobacionApi: req.body.aprobacionApi }
      );
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
      const reg = await models.VehiculoPersonal.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 3, aprobacionApi: req.body.aprobacionApi }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        messaje: "Ocurrio un error",
      });
      next(e);
    }
  },
};
