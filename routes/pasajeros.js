import routerx from 'express-promise-router';
import pasajerosController from '../controllers/PasajerosController';
import auth from '../middlewares/auth'

const router= routerx();

router.post('/add',auth.verifyAdministrador,auth.verifyCliente,pasajerosController.add);
router.get('/query',auth.verifyAdministrador,auth.verifyCliente,pasajerosController.query);
router.get('/list',auth.verifyAdministrador,auth.verifyCliente, pasajerosController.list);
router.get('/busquedaRfc',auth.verifyAdministrador,auth.verifyCliente, pasajerosController.busquedaRfc);
router.put('/update',auth.verifyAdministrador,auth.verifyCliente, pasajerosController.update);

export default router;
