const mongoose = require('mongoose');

const MyContractSchema = new mongoose.Schema({
    contractType: {
        type:String,
        required:[true,'Debes ingresar un tipo de contrato'],
        minLength:[3,'El nombre debe contener un minimo de 3 caracteres']
    },
    startOfContract: {
        type:Date,
        required:[true,'Debes ingresar una fecha de inicio de contrato'],
        max:[Date,'La fecha de inicio contrato no debe ser posterior a la fecha actual']
    },
    contractTerm:{
        type:Date,
        required:[true,'Debes ingresar una fecha de termino de contrato']
    },
    equipmentOnContract:{
        type:String,
        required:[true,'Debe ingresar la serie del equipo en contrato'],
        minLength:[9,'La serie del equipo debe contener un minimo de 9 caracteres'],
        unique:[true, 'El nombre debe ser unico']},
    contractSupplier:{
        type:String,
        required:[true,'Debes ingresar un tipo de contrato'],
    },
},
{timestamps:true});

module.exports.MyContract = mongoose.model("mycontract",MyContractSchema);

