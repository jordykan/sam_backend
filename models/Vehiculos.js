import mongoose, {Schema} from 'mongoose';

const VehiculosSchema = new Schema({

    placa:{type:String, unique:true,required:true},
    vigenciaSeguro:{type:String},
    color:{type:String},
    tipoVehiculo:{type:String},
    targetaCirculacion:{type:String},
    poliza:{type:String}
   
})

const Vehiculos = mongoose.model('vehiculos',VehiculosSchema);
export default Vehiculos;