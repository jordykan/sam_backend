import mongoose, {Schema} from 'mongoose';

const archivoSchema = new Schema({
    tipo:{type:String, unique:true},
    nombre:{type:String}
})

const Archivo = mongoose.model('archivo',archivoSchema);

export default Archivo; 