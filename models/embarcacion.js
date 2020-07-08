import mongoose, {Schema} from 'mongoose';

const embarcacionSchema = new Schema({

    nombre:{type:String, unique:true,required:true},
    armador:{type:String, required:true},
    bandera:{type:String,required:true},
    pto_matricula:{type:String,required:true},
    trn:{type:String,required:true},
    puntal:{type:String,required:true},
    eslora:{type:Number, required:true},
    manga:{type:Number, required:true},
    tbr:{type:Number, required:true},
    imo:{type:String,required:true},
    matricula:{type:String, required:true},
    calado:{type: String, required:true},
    tipo:{type: String, required:true},
    certificado_a:{type: String},
    estado:{type:Number, default:1},
    createdAt:{type: Date, default:Date.now}
})

const Embarcacion = mongoose.model('embarcacion',embarcacionSchema);

export default Embarcacion;