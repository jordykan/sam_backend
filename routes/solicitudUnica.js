import routerx from 'express-promise-router';
import solicitudUnicaController from '../controllers/SolicitudUnicaController';
import auth from '../middlewares/auth'

const router= routerx();

router.post('/add',auth.verifyCliente,solicitudUnicaController.add);
router.get('/query',auth.verifyCliente,solicitudUnicaController.query);
router.get('/list',auth.verifyCliente,solicitudUnicaController.list);
router.get('/listarSUPorUsuario',auth.verifyCliente,auth.verifyAdministrador,auth.verifyApitab,solicitudUnicaController.listarSUPorUsuario);
router.get('/listarSUPorAgencia',auth.verifyCliente,auth.verifyAdministrador,auth.verifyApitab,solicitudUnicaController.listarSUPorAgencia);
router.get('/listarSUPorFecha',auth.verifyCliente,auth.verifyAdministrador,auth.verifyApitab,solicitudUnicaController.listarSUPorFecha);
router.get('/listarSUPorMuelle',auth.verifyCliente,auth.verifyAdministrador,auth.verifyApitab,solicitudUnicaController.listarSUPorMuelle);
router.get('/listarSUPorEmbarcacion',auth.verifyCliente,auth.verifyAdministrador,auth.verifyApitab,solicitudUnicaController.listarSUPorEmbarcacion);
router.get('/listarSUPorEstatus',auth.verifyCliente,auth.verifyAdministrador,auth.verifyApitab,solicitudUnicaController.listarSUPorEstatus);
router.get('/listAdmin',auth.verifyCliente,auth.verifyAdministrador,auth.verifyApitab,solicitudUnicaController.listAdmin);
router.put('/aprobarApi',auth.verifyCliente,auth.verifyAdministrador,auth.verifyApitab,solicitudUnicaController.aprobarApi);
router.put('/update',auth.verifyCliente,solicitudUnicaController.update);
router.delete('/remove',auth.verifyCliente,solicitudUnicaController.remove);
router.put('/activate',auth.verifyCliente,solicitudUnicaController.activate);
router.put('/finalizarServicio',auth.verifyCliente,solicitudUnicaController.finalizarServicio);
router.put('/finalizarServicioNoRealizado',auth.verifyCliente,solicitudUnicaController.finalizarServicioNoRealizado);
router.put('/deactivate',auth.verifyCliente,solicitudUnicaController.deactivate);
router.put('/deactivateApi',auth.verifyCliente,solicitudUnicaController.deactivateApi);

export default router;
