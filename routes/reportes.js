import routerx from 'express-promise-router';
import reportesController from '../controllers/ReportesController';
import auth from '../middlewares/auth'

const router= routerx();

router.get('/reporteUsuario',auth.verifyCliente,reportesController.listarCGPorUsuario);

export default router;
