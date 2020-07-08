import models from "../models";
import fs from "fs";
import { model } from "mongoose";
import path from "path";
export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Archivo.create(req.body);
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
      var file_path = req.files.file0.path;
      var file_split = file_path.split("\\");

      var file_name = file_split[2];

      var extension_split = file_name.split(".");
      var file_ext = extension_split[1];

      if (file_ext != "png" && file_ext != "pdf" && file_ext != "jpg") {
        fs.unlink(file_path, (err) => {
          return res.status(200).send({
            status: "error",
            message: "La extension no es valida",
          });
        });
      }
      const reg = await models.Archivo.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        messaje: "Ocurrio un error",
      });
      next(e);
    }
  },
  update: (req, res) => {
    var file_name = "Imagen";
    if (!req.files) {
      return res.status(404).send({
        status: "error",
        message: file_name,
      });
    }
    var file_path = req.files.file0.path;
    var file_split = file_path.split("\\");

    var file_name = file_split[2];

    var extension_split = file_name.split(".");
    var file_ext = extension_split[1];

    if (file_ext != "png" && file_ext != "pdf" && file_ext != "jpg") {
      fs.unlink(file_path, (err) => {
        return res.status(200).send({
          status: "error",
          message: "La extension no es valida",
        });
      });
    } else {
      return res.status(404).send({
        fichero: req.files,
        split: file_split,
        file_ext,
      });
    }
  },
};
