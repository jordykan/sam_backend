import routerx from 'express-promise-router';
import bitacoraEmbarcaciones from '../controllers/BitacoraEmbarcacionController';
import auth from '../middlewares/auth'

const router= routerx();

router.post('/add',auth.verifyAdministrador,auth.verifyCliente,bitacoraEmbarcaciones.add);
router.get('/list',auth.verifyAdministrador,auth.verifyCliente,bitacoraEmbarcaciones.list);
router.put('/update',auth.verifyCliente,auth.verifyAdministrador,bitacoraEmbarcaciones.update)


export default router;
