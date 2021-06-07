import mongoose, {Schema} from 'mongoose'

const estadiaSchema = new Schema({
    embarcacion: {type:Schema.ObjectId, ref:'embarcacion', required:true},
    agencia: {type:Schema.ObjectId, ref:'agencia', required:true},
    periodo: {type:String, required:true, default:Date.now},
    embarquePax : {type:Number,required:true,default:0},
    desembarquePax : {type:Number, required:true, default:0},
    embarqueTon : {type:Number, required:true, default:0},
    desembarqueTon: {type:Number,required:true,default:0},
    horaAtraque: {type: Date, required:true},
    horaDesatraque: {type:Date, required:true},
    amarre:{type:Boolean, required:true} ,
    createdAt:{type:Date, default:Date.now},
    estatus:{type:String, default:'Pendiente'}
})  

const estadia = mongoose.model('estadia',estadiaSchema);
export default estadia;