import mongoose, {Schema} from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

const cambioGuardiaSchema = new Schema({
    folio: {type:Number,unique:true},
    usuario: {type:Schema.ObjectId,ref:'usuario',required:true},    
    fecha: {type:Array, required:true},
    tipo:{type:String, required:true},
    operacion:{type:String,required:true},
    compania: {type:String,required:true},
    muelle: {type:String, required:true},
    aprobacionApi:{type:String,default:''},
    aprobacionAmls:{type:String,default:''},
    embarcacion: {type:Schema.ObjectId,ref:'embarcacion',required:true},
    detalles: {type:String, required:true},
    estado: {type:Number, default:0},
    motivo_cancelacion: {type:String},
    
    adjunto: {type:String},
    fechaAprobacion:{type:Date},
    createdAt: {type:Date, default: Date.now()},
    pasajeros:[{
        rfc:{
            type:String,
            required:true
        },
        nombreCompleto:{
            type:String,
            required:true
        },
        identificacion:{
            type:String,
            required:true
        },
        nss:{
            type:String,
            required:true
        },
        compania:{
            type:String,
            required:true
        },
        puesto:{
            type:String,
            required:true
        },
        destino:{
            type:String,
            required:true
        },
        estado:{
            type:String,
            default:'Pendiente'
        },
        
    }]
})

cambioGuardiaSchema.plugin(AutoIncrement,{inc_field:'folio'})
const CambioGuardia = mongoose.model('cambioGuardia',cambioGuardiaSchema);
export default CambioGuardia;   