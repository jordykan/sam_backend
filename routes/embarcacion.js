import routerx from 'express-promise-router';
import multipart from 'connect-multiparty'
import embarcacionController from '../controllers/EmbarcacionController';
import auth from '../middlewares/auth'


const md_upload = multipart({ uploadDir: './uploads/certificado_a'})

const router= routerx();

router.post('/add',auth.verifyAdministrador,embarcacionController.add);
router.get('/query',auth.verifyAdministrador,embarcacionController.query);
router.get('/queryDatos',auth.verifyAdministrador,embarcacionController.queryDatos);
router.get('/list',auth.verifyCliente,auth.verifyAdministrador,auth.verifyApitab,embarcacionController.list);
router.get('/listActivos',auth.verifyCliente,auth.verifyAdministrador,auth.verifyApitab,embarcacionController.listActivos);
router.get('/listFecha',auth.verifyCliente,auth.verifyAdministrador,embarcacionController.listFecha);
router.put('/update',auth.verifyAdministrador,embarcacionController.update);
router.put('/upload/:_id',md_upload,embarcacionController.upload);
router.get('/getCertificado/:archivo',embarcacionController.getCertificado);
router.delete('/remove',auth.verifyAdministrador,embarcacionController.remove);
router.put('/activate',auth.verifyAdministrador,embarcacionController.activate);
router.put('/deactivate',auth.verifyAdministrador,embarcacionController.deactivate);


export default router;
