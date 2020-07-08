import routerx from 'express-promise-router';
import archivoController from '../controllers/ArchivoController';

const router= routerx();
import multipart from 'connect-multiparty'

var md_upload = multipart({ uploadDir: './uploads/archivos'});

router.post('/add',archivoController.add);
router.post('/upload',md_upload,archivoController.upload);

export default router;
