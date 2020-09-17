import mongoose, {Schema} from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

const vehiculosPersonalSchema = new Schema({
    counter: {type:Number,unique:true},
    usuario: [{type:Schema.ObjectId,ref:'usuario',required:true}],

    fecha: {type:Array, required:true},
    tipo: {type:String,required:true},
    compania: {type:String,required:true},
    ingreso_mat:{type:Boolean},
    retiro_mat:{type:Boolean},
    embarcacion: {type:Schema.ObjectId,ref:'embarcacion',required:true},
    muelle: {type:String, required:true},
    aprobacionApi:{type:String,default:''},
    aprobacionAmls:{type:String,default:''},
    estado: {type:Number, default:0},
    createdAt: {type:Date, default: Date.now()},
    manifiesto: {type:String},
    vehiculos_adj: {type:String},
    personal_adj: {type:String},
    detalles:{type:String,required:true},
    motivo_cancelacion:{type:String},
    fechaAprobacion:{type:Date},
    vehiculos:[{
        marca:{
            type:String,
            required:true
        },
        compania_aseguradora:{
            type:String,
            required:true
        },
        placa:{
            type:String,
            required:true
        },
        vigenciaSeguro:{
            type:String,
            required:true
        },
        color:{
            type:String,
            required:true
        },
        tipo:{
            type:String
        },
    }],
    pasajeros:[{
        nombreCompleto:{
            type:String,
            required:true
        },
        compania:{
            type:String 
        },
        puesto:{
            type:String
        },
        licencia:{
            type:String,
        }
    }]
})

vehiculosPersonalSchema.plugin(AutoIncrement,{inc_field:'counter'})
const VehiculoPersonal = mongoose.model('vehiculoPersonal',vehiculosPersonalSchema);
export default VehiculoPersonal;   