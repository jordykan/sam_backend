import routerx from 'express-promise-router';
import agenciaController from '../controllers/AgenciaController'
import auth from '../middlewares/auth'


const router = routerx();

router.post('/add',agenciaController.add);
router.get('/query',auth.verifyCliente,auth.verifyApitab,agenciaController.query);
router.get('/list',auth.verifyCliente,auth.verifyApitab, agenciaController.list);
router.put('/update',auth.verifyCliente,auth.verifyApitab, agenciaController.update);
router.get('/listActivos',auth.verifyCliente,auth.verifyApitab, agenciaController.listActivos);
router.delete('/remove',auth.verifyCliente,agenciaController.remove);
router.put('/activate',auth.verifyCliente,agenciaController.activate);
router.put('/deactivate',auth.verifyCliente,agenciaController.deactivate);
export default router;