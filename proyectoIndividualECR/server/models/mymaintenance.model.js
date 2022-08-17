const mongoose = require('mongoose');

const MyMaintenanceSchema = new mongoose.Schema({
    technician: {
        type:String,
        required:[true,'Debes ingresar un tecnico']
    },
    contract: {
        type:String,
    },
    equipment:{
        type:String,
        required:[true,'Debes ingresar un equipo'],
        unique:[true,'El Equipo debe ser unico']
    },
    maintenanceState:{
        type:Boolean,
    },
    maintenanceDate:{
        type:Date,
    },
    lastMaintenanceDate:{
        type:Date,
    }
},
{timestamps:true});

module.exports.MyMaintenance = mongoose.model("mymaintenance",MyMaintenanceSchema);

