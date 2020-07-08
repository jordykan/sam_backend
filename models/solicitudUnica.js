import mongoose, {Schema} from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

const solicitudUnicaSchema = new Schema({
    folio_solicitud:{type:Number,unique:true},
    embarcacion:{type: Schema.ObjectId, ref:'embarcacion'},
    usuario:{type:Schema.ObjectId, ref:'usuario'},
    aprobacionApi:{type:String,default:''},
    procedencia:{type:String, required:true},
    aprobacionAmls:{type:String, default:''},
    infraestructura: {type:Array,required:true},
    servicios_portuarios:{type:Array,required:true},
    otros_servicios:{type:String},
    operacion_carga:{type:Boolean},
    operacion_descarga:{type:Boolean},
    total_toneladas:{type:String},
    tipo_carga:{type:String},
    muelle:{type:String, required:true},
    eta:{type:Date,required:true},
    etd:{type:Date, required:true},
    comentarios:{type:String, required:true},
    estado:{type:String, default:0},
    motivo_cancelacion:{type:String},
    capitan:{type:String,required:true},
    no_tripulantes:{type:Number,required:true},
    observaciones:{type:String},
    createdAt:{type:Date, default:Date.now},
    fechaAprobacion:{type:Date}
})

solicitudUnicaSchema.plugin(AutoIncrement,{inc_field:'folio_solicitud'})
const Solicitud = mongoose.model('solicitudUnica',solicitudUnicaSchema);

export default Solicitud;
