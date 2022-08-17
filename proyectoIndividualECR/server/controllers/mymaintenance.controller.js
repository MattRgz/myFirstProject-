const { MyMaintenance } = require("../models/mymaintenance.model");


module.exports.index = (req, response) => {
  response.json({ message: "ITS WORKING!" });
};

module.exports.createMyMaintenance = (req, res) => {
  const { technician, contract, equipment, maintenanceState,maintenanceDate,lastMaintenanceDate} = req.body;
  MyMaintenance.create(req.body)
    .then((mymaintenance) => res.json(mymaintenance))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! no hemos podido crear tu mantenimiento!'}));
};
module.exports.findMyMaintenanceBySerial = (req,res) => {
  MyMaintenance.findOne({ equipment: req.params.equipmentSerialNumber })
    .then((mymaintenance) => res.json(mymaintenance))
    .catch((err) =>res.status(404).json({ error: err, msg:'Ups! no hemos podido encontrar tu mantenimiento POR SERIE!'}));
};
module.exports.findMyMaintenance = (req, res) => {
  MyMaintenance.find({})
    .then((mymaintenance) => res.json(mymaintenance))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! No hemos encontrado tus mantenimientos'}));
};

module.exports.findOneMyMaintenance = (req, res) => {
  MyMaintenance.findOne({ _id: req.params.id })
    .then((mymaintenance) => res.json(mymaintenance))
    .catch((err) =>res.status(404).json({ error: err, msg:'Ups! no hemos podido encontrar tu mantenimiento!'}));
};

module.exports.updateMyMaintenance = (req, res) => {
  MyMaintenance.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((updatedMyMaintenance) => res.json(updatedMyMaintenance))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! no hemos podido actualizar tu mantenimiento!'}));
};

module.exports.deleteMyMaintenance = (req, res) => {
  MyMaintenance.findOneAndDelete({ _id: req.params.id })
    .then((deleteConfirmation) => res.json(deleteConfirmation))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! no hemos podido borrar tu mantenimiento!'}));
};

