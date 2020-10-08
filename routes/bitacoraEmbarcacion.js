import routerx from 'express-promise-router';
import bitacoraEmbarcacion from '../controllers/BitacoraEmbarcacionController';
import auth from '../middlewares/auth'

const router= routerx();

router.post('/add',auth.verifyAdministrador,auth.verifyCliente,bitacoraEmbarcacion.add);
router.get('/list',auth.verifyAdministrador,auth.verifyCliente,bitacoraEmbarcacion.list);
router.put('/update',auth.verifyCliente,auth.verifyAdministrador,bitacoraEmbarcacion.update)


export default router;
