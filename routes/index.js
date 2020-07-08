'use strict'
import multipart from 'connect-multiparty'
var md_upload = multipart({ uploadDir: './uploads/archivos'});
import routerx from 'express-promise-router';
import embarcacionRouter from './embarcacion';
import solicitudUnicaRouter from './solicitudUnica'
import usuarioRouter from './usuario'
import archivoRouter from './archivo'
import cambioGuardia from './cambioGuardia'
import agencica from './agencia'
import VehiculoPersonal from './vehiculosPersonal';
import Reportes from './reportes'
import Pasajeros from './pasajeros'
import Compania from './companias'

const router = routerx();

router.use('/embarcacion',embarcacionRouter);
router.use('/solicitudUnica',solicitudUnicaRouter);
router.use('/usuario',usuarioRouter);
router.use('/archivo',archivoRouter);
router.use('/cambioGuardia',cambioGuardia);
router.use('/agencia',md_upload,agencica);
router.use('/vehiculoPersonal',VehiculoPersonal);
router.use('/reportes',Reportes);
router.use('/pasajeros',Pasajeros);
router.use('/companias',Compania)
export default router;
    
