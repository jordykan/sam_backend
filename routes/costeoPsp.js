import routerx from 'express-promise-router';
import costeoPsp from '../controllers/CosteoPspController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add',auth.verifyAdministrador,costeoPsp.add);
router.get('/list',auth.verifyCliente,costeoPsp.list)
router.get('/listFecha',auth.verifyCliente,costeoPsp.listFechas);

export default router;