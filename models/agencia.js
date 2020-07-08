import mongoose, {Schema} from 'mongoose';
const agenciaSchema = new Schema({
    nombre:{type: String, unique:true, required:true},
    rfc:{type:String, unique:true, required:true},
    direccion:{type:String, required:true},
    email:{type:String, required:true},
    representante:{type:String, required:true},
    folio:{type:String,required:true},
    estado:{type:Number, default:1},
    createdAt:{type: Date, default:Date.now},
})

const Agencia = mongoose.model('agencia',agenciaSchema);
export default Agencia;