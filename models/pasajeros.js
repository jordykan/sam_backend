import mongoose, {Schema} from 'mongoose';

const pasajerosSchema = new Schema({
    agencia:{type:Schema.ObjectId, ref:'agencia'},
    rfc : {type: String,required:true},
    nombre: {type: String,required:true},
    apellidoPaterno: {type: String, required: true},
    apellidoMaterno: {type:String, require:true},
    nss: {type:String, required:true},
    compania:{type:String,required:true},
    puesto:{type:String,required:true},
    estado: {type:Number, default:0},
    createdAt: {type:Date, default: Date.now()},
})

const pasajeros = mongoose.model('pasajeros',pasajerosSchema);
export default pasajeros;   



