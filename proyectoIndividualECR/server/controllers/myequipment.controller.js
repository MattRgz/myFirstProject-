const { MyEquipment} = require("../models/myequipment.model")

module.exports.createMyEquipment = (req, res) => {
  const { equipmentModel, equipmentSerialNumber, 
    equipmentState, observation, maintenanceState,equipmentUbication,equipmentType,
    accessories,contract} = req.body;
  MyEquipment.create(req.body)
    .then((myequipment) => res.json(myequipment))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! no hemos podido crear tu equipo!'}));
};

module.exports.findMyEquipmentBySerial = (req,res) => {
  MyEquipment.findOne({ equipmentSerialNumber: req.params.equipmentSerialNumber })
    .then((myequipment) => res.json(myequipment))
    .catch((err) =>res.status(404).json({ error: err, msg:'Ups! no hemos podido encontrar tu equipo POR SERIE!'}));
};

module.exports.findMyEquipment = (req, res) => {
  MyEquipment.find({})
    .then((myequipment) => res.json(myequipment))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! No hemos encontrado tus equipos'}));
};

module.exports.findOneMyEquipment = (req, res) => {
  MyEquipment.findOne({ _id: req.params.id })
    .then((myequipment) => res.json(myequipment))
    .catch((err) =>res.status(404).json({ error: err, msg:'Ups! no hemos podido encontrar tu equipo!'}));
};

module.exports.updateMyEquipment = (req, res) => {
  MyEquipment.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((updatedMyEquipment) => res.json(updatedMyEquipment))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! no hemos podido actualizar tu equipo!'}));
};

module.exports.deleteMyEquipment = (req, res) => {
  MyEquipment.findOneAndDelete({ _id: req.params.id })
    .then((deleteConfirmation) => res.json(deleteConfirmation))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! no hemos podido borrar tu equipo!'}));
};
