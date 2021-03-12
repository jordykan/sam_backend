import jwt from 'jsonwebtoken';
import models from '../models'

async function checkToken(token){
     let __id = null;
     try{
        const {_id} = await jwt.decode(token);
        __id = _id;
     }catch(e){
        return false;
     }
     const user = await models.Usuario.findOne({_id:__id,estado:1});
     if(user){
         const token = jwt.sign({_id:__id},'clavetokenamls',{expiresIn:'1d'});
         return {token,rol:user.rol,id:user.id,agencia:user.agencia};
     }else{
         return false;
     }
}

export default{
    encode: async(_id,rol,email,nombre,agencia,telefono)=>{
        const token = jwt.sign({_id:_id,rol:rol,email:email,nombre:nombre,agencia:agencia,telefono:telefono},'clavetokenamls',{expiresIn: '1d'});
        return token;
    },
    decode: async(token)=>{
        try{
            const {_id} = await jwt.verify(token,'clavetokenamls');
            const user = await models.Usuario.findOne({_id,estado:1});
            if(user){
                return user;
            }else{
                return false;
            }
        }catch(e){
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}