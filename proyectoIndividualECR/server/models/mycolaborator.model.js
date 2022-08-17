const mongoose = require('mongoose');

const MyColaboratorSchema = new mongoose.Schema({
    colaboratorName: {
        type:String,
        required:[true,'Debes ingresar el nombre del Colaborador'],
        minLength:[3,'El nombre debe contener un minimo de 3 caracteres']
    },
    colaboratorId: {
        type:String,
        required:[true,'Debes ingresar una Id de Colaborador'],
        unique:[true, 'El nombre debe ser unico'],
    },
    colaboratorCharge:{
        type:String,
        required:[true,'Debes ingresar el Cargo del Colaborador']
    },
    colaboratorArea:{
        type:String,
        required:[true,'Debe ingresar el Area del Colaborador'],
        minLength:[3,'La serie del equipo debe contener un minimo de 9 caracteres']
    },
},
{timestamps:true});

module.exports.MyColaborator = mongoose.model("mycolaborator",MyColaboratorSchema);

