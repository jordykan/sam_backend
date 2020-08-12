import routerx from 'express-promise-router';
import multipart from 'connect-multiparty'
import vehiculosPersonal from '../controllers/VehiculosPersonalController';
import auth from '../middlewares/auth'

const md_upload = multipart({ uploadDir: './uploads/accesos'})

const router= routerx();

router.put('/update/:_id',md_upload,vehiculosPersonal.update);
router.put('/updateVehiculos/:_id',md_upload,vehiculosPersonal.updateVehiculos);
router.put('/updatePersonal/:_id',md_upload,vehiculosPersonal.updatePersonal);
router.get('/getAccesoManifiesto/:archivo',vehiculosPersonal.getAccesoManifiesto);
router.get('/getAccesoPersonal/:archivo',vehiculosPersonal.getAccesoPersonal);
router.get('/getAccesoVehiculo/:archivo',vehiculosPersonal.getAccesoVehiculo);
router.post('/add',auth.verifyAdministrador,auth.verifyCliente,vehiculosPersonal.add);
router.post('/addVehiculos',md_upload,auth.verifyAdministrador,auth.verifyCliente,vehiculosPersonal.addVehiculos);
router.get('/query',auth.verifyAdministrador,auth.verifyCliente,vehiculosPersonal.query);
router.get('/list',auth.verifyCliente, auth.verifyAdministrador,vehiculosPersonal.list);
router.get('/listAdmin',auth.verifyCliente, auth.verifyAdministrador,vehiculosPersonal.listAdmin);
router.put('/aprobarApi',auth.verifyCliente,auth.verifyAdministrador,auth.verifyApitab,vehiculosPersonal.aprobarApi);
router.put('/activate',auth.verifyCliente,vehiculosPersonal.activate);
router.put('/actualizar',auth.verifyCliente,vehiculosPersonal.actualizar);
router.put('/deactivate',auth.verifyCliente,vehiculosPersonal.deactivate);
router.put('/deactivateApi',auth.verifyCliente,vehiculosPersonal.deactivateApi);


export default router;
