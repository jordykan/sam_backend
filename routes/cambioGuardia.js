import routerx from 'express-promise-router';
import cambioGuardia from '../controllers/CambioGuardiaController';
import auth from '../middlewares/auth'
import multipart from 'connect-multiparty'
const md_upload = multipart({ uploadDir: './uploads/certificado_a'})

const router= routerx();

router.post('/add',auth.verifyAdministrador,auth.verifyCliente,cambioGuardia.add);
router.get('/query',auth.verifyAdministrador,auth.verifyCliente,cambioGuardia.query);
router.get('/list',auth.verifyCliente, cambioGuardia.list);
router.get('/listCGUsuario',auth.verifyCliente, cambioGuardia.listarCGPorUsuario);
router.get('/listCGEmbarcacion',auth.verifyCliente, cambioGuardia.listarCGPorEmbarcacion);
router.get('/listCGEstado',auth.verifyCliente, cambioGuardia.listarCGPorEstado);
router.get('/listCGMuelle',auth.verifyCliente, cambioGuardia.listarCGPorMuelle);
router.get('/listFecha',auth.verifyCliente,auth.verifyAdministrador,auth.verifyApitab, cambioGuardia.listFecha);
router.get('/listBitacora',auth.verifyCliente, cambioGuardia.listBitacora);
router.put('/update',auth.verifyAdministrador,cambioGuardia.update);
router.put('/upload',md_upload,auth.verifyAdministrador,cambioGuardia.upload);
router.put('/updatePassengers',auth.verifyAdministrador,cambioGuardia.updatePassengers);
router.get('/listAdmin',auth.verifyCliente, cambioGuardia.listAdmin);
router.put('/activate',auth.verifyAdministrador,auth.verifyCliente,cambioGuardia.activate);
router.put('/aprobarApi',auth.verifyAdministrador,auth.verifyCliente,cambioGuardia.confirmarApi);
router.put('/deactivateApi',auth.verifyAdministrador,auth.verifyCliente,cambioGuardia.deactivateApi);
router.put('/deactivate',auth.verifyAdministrador,auth.verifyCliente,cambioGuardia.deactivate);


export default router;
