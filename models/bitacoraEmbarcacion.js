import mongoose, {Schema} from 'mongoose';

const bitacoraEmbarcacionSchema = new Schema({
    agencia: {type:Schema.ObjectId, ref:'agencia', required:true},
    embarcacion: {type:Schema.ObjectId, ref:'embarcacion', required:true},
    atraque: {type:Date, required:true},
    desatraque: {type:Date, required:true},
    estadia: {type:Number, required:true},
    embarquePx: {type:Number, required:true},
    desembarquePx: {type:Number, required:true},
    folioServicio : {type:String,required:true},
    entrada: {type:Number,required:true},
    salida: {type:Number,required:true},
    mesCaptura:{type:Date,required:true}
})

const bitacoraEmbarcacion = mongoose.model('bitacoraEmbarcacion',bitacoraEmbarcacionSchema);
export default bitacoraEmbarcacion