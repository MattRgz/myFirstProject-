const mongoose = require('mongoose');

const MyEquipmentSchema = new mongoose.Schema({
    equipmentModel: {
        type:String,
        required:[true,'Debes ingresar un modelo de equipo'],
        minLength:[3,'El modelo debe contener un minimo de 3 caracteres']
    },
    equipmentSerialNumber: {
        type:String,
        required:[true,'Debes ingresar numero de serie de equipo'],
        minLength:[3,'El nombre debe contener un minimo de 3 caracteres'],
        unique:[true, 'El numero de serie debe ser unico']
    },
    equipmentState:{
        type:String,
        required:[true,'Debes ingresar el estado actual del equipo']
    },
    observation:{
        type:String,
        required:[true,'Debe ingresar una observacion para el equipo'],
        minLength:[3,'La observacion debe contener un minimo de 3 caracteres']},
    equipmentUbication: {
        type:String,
        required:[true,'Debes ingresar una ubicacion valida'],
        minLength:[3,'El nombre debe contener un minimo de 3 caracteres']
    },
    equipmentType: {
        type:String,
        required:[true,'Debes ingresar un tipo de equipo'],
        minLength:[3,'El nombre debe contener un minimo de 3 caracteres']
    },
    accessories: {
        type:String,
        required:[true,'Debes ingresar un numero de accesorios vinculados al equipo'],
    }
},
{timestamps:true});

module.exports.MyEquipment = mongoose.model("myequipment",MyEquipmentSchema);