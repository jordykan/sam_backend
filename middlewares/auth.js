import tokenService from '../services/token';
export default{
    verifyUsuario: async(req,res,next) =>{
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Administrador' || response.rol == 'Cliente' || response.rol == 'PSP' || response.rol == 'APITAB'){
            next();
        }else{
            return res.status(403).send({
                message: 'no autorizado'
            })
        }

    },
    verifyAdministrador: async(req,res,next) =>{
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Administrador' || response.rol=='Cliente' || response.rol=='APITAB' || response.rol=='PSP'){
            next();
        }else{  
            return res.status(403).send({
                message: 'no autorizado'
            })
        }
    },
    verifyCliente: async(req,res,next) =>{
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Cliente' || response.rol == 'Administrador'|| response.rol == "APITAB" || response.rol=='PSP'){
            next();
        }else{
            return res.status(403).send({
                message: 'no autorizado'
            })
        }
    },
    verifyProveedor: async(req,res,next) =>{
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Cliente' || response.rol == 'Administrador'|| response.rol == "APITAB" || response.rol=='PSP'){
            next();
        }else{
            return res.status(403).send({
                message: 'no autorizado'
            })
        }
    },
    verifyApitab: async(req,res,next) => {
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Cliente' || response.rol == 'Administrador'|| response.rol == "APITAB" || response.rol=='PSP'){
            next();
        }else{
            return res.status(403).send({
                message: 'no autorizado'
            })
        }
    }
}