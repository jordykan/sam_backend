import routerx from 'express-promise-router';
import companiaController from '../controllers/CompaniaController';
import auth from '../middlewares/auth'

const router= routerx();

router.post('/add',auth.verifyAdministrador,auth.verifyCliente,companiaController.add);
router.get('/query',auth.verifyAdministrador,auth.verifyCliente,companiaController.query);
router.get('/list',auth.verifyAdministrador,auth.verifyCliente, companiaController.list);
router.put('/update',auth.verifyAdministrador,auth.verifyCliente, companiaController.update);

export default router;
