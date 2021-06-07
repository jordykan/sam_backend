import routerx from 'express-promise-router';
import estadiaController from '../controllers/EstadiaController';
import auth from '../middlewares/auth'

const router= routerx();

router.post('/add',auth.verifyAdministrador,auth.verifyCliente,estadiaController.add);
router.get('/query',auth.verifyAdministrador,auth.verifyCliente,estadiaController.query);
router.get('/list',auth.verifyAdministrador,auth.verifyCliente, estadiaController.list);
router.put('/update',auth.verifyAdministrador,auth.verifyCliente, estadiaController.update);

export default router;
