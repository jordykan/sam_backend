import routerx from 'express-promise-router';
import usuarioController from '../controllers/UsuarioController';
import auth from '../middlewares/auth'

const router= routerx();

router.post('/add', usuarioController.add);
router.post('/addPsp', usuarioController.addPsp);
router.get('/query', auth.verifyAdministrador, usuarioController.query);
router.get('/list', auth.verifyAdministrador, usuarioController.list);
router.get('/listPsp', auth.verifyAdministrador, usuarioController.listPsp);
router.get('/listActivos', auth.verifyAdministrador, usuarioController.listActivos);
router.put('/update', auth.verifyAdministrador, usuarioController.update);
router.put('/updatePassword',auth.verifyAdministrador,usuarioController.updatePassword)
router.delete('/remove', auth.verifyAdministrador, usuarioController.remove);
router.put('/activate', auth.verifyAdministrador, usuarioController.activate);
router.put('/deactivate', auth.verifyAdministrador, usuarioController.deactivate);
router.post('/login',usuarioController.login);

export default router;