import models from "../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Compania.create(req.body);
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
      const reg = await models.Compania.findOne({ _id: req.query._id });
      if (!reg) {
        res.status(404).send({
          message: "El registro no existe",
        });
      } else {
        res.status(200).json(reg.nombre);
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
      const reg = await models.Compania.find({ compania: req.body.compania });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },

  listActivos: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.Compania.find({ estado: 1 }).sort({
        createdAt: -1,
      });
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
      const reg = await models.Compania.findByIdAndUpdate(
        { _id: req.body._id },
        {
          rfc: req.body.rfc,
          razon_social: req.body.razon_social,
          representante: req.body.representante,
          email: req.body.email,
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

  activate: async (req, res, next) => {
    try {
      const reg = await models.Compania.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 }
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
      const reg = await models.Compania.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 }
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
