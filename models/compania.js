import mongoose, {Schema} from 'mongoose';

const companiaSchema = new Schema({
    agencia:{type:Schema.ObjectId, ref:'agencia'},
    rfc : {type: String,required:true},
    razon_social: {type: String,required:true},
    representante : {type: String,required:true},
    email: {type:String, required:true},
    estado: {type:Number, default:0},
    createdAt: {type:Date, default: Date.now()},
})

const compania = mongoose.model('compania',companiaSchema);
export default compania;   



