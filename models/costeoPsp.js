import mongoose, {Schema} from 'mongoose'

const costeoPspSchema = new Schema({
    agencia:{type:Schema.ObjectId, ref:'agencia'},
    servicio:{type:String},   
    remision:{type:String},
    monto:{type:Number, required:true},
    subtotal:{type:Number,required:true},
    fechaServicio:{type:Array,required:true},
    fechaRemitida:{type:Date},
    createdAt:{type:Date, default:Date.now()}
})
const costeoPsp = mongoose.model('costeoPsp',costeoPspSchema);
export default costeoPsp;