const { MyContract } = require("../models/mycontract.model");


module.exports.index = (req, response) => {
  response.json({ message: "ITS WORKING!" });
};

module.exports.createMyContract = (req, res) => {
  const { contractType, startOfContract, contractTerm, equipmentOnContract, contractSupplier} = req.body;
  MyContract.create(req.body)
    .then((mycontract) => res.json(mycontract))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! no hemos podido crear tu contrato!'}));
};
module.exports.findMyContractBySerial = (req,res) => {
  MyContract.findOne({ equipmentOnContract: req.params.contractSerialNumber })
    .then((mycontract) => res.json(mycontract))
    .catch((err) =>res.status(404).json({ error: err, msg:'Ups! no hemos podido encontrar tu CONTRATO POR SERIE!'}));
};
module.exports.findMyContract = (req, res) => {
  MyContract.find({})
    .then((mycontract) => res.json(mycontract))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! No hemos encontrado tus contratos'}));
};

module.exports.findOneMyContract = (req, res) => {
  MyContract.findOne({ _id: req.params.id })
    .then((mycontract) => res.json(mycontract))
    .catch((err) =>res.status(404).json({ error: err, msg:'Ups! no hemos podido encontrar tu contrato!'}));
};

module.exports.updateMyContract = (req, res) => {
  MyContract.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((updatedMyContract) => res.json(updatedMyContract))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! no hemos podido actualizar tu contrato!'}));
};

module.exports.deleteMyContract = (req, res) => {
  MyContract.findOneAndDelete({ _id: req.params.id })
    .then((deleteConfirmation) => res.json(deleteConfirmation))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! no hemos podido borrar tu contrato!'}));
};


