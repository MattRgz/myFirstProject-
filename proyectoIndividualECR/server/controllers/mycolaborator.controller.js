const { MyColaborator } = require("../models/myColaborator.model");


module.exports.index = (req, response) => {
  response.json({ message: "ITS WORKING!" });
};

module.exports.createMyColaborator = (req, res) => {
  const { colaboratorName, colaboratorId, colaboratorCharge, colaboratorArea} = req.body;
  MyColaborator.create(req.body)
    .then((mycolaborator) => res.json(mycolaborator))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! no hemos podido crear tu colaborador!'}));
};

module.exports.findMyColaborator = (req, res) => {
  MyColaborator.find({})
    .then((mycolaborator) => res.json(mycolaborator))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! No hemos encontrado tus colaborador'}));
};

module.exports.findOneMyColaborator = (req, res) => {
  MyColaborator.findOne({ _id: req.params.id })
    .then((mycolaborator) => res.json(mycolaborator))
    .catch((err) =>res.status(404).json({ error: err, msg:'Ups! no hemos podido encontrar tu colaborador!'}));
};

module.exports.updateMyColaborator = (req, res) => {
  MyColaborator.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((updatedMyColaborator) => res.json(updatedMyColaborator))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! no hemos podido actualizar tu colaborador!'}));
};

module.exports.deleteMyColaborator = (req, res) => {
  MyColaborator.findOneAndDelete({ _id: req.params.id })
    .then((deleteConfirmation) => res.json(deleteConfirmation))
    .catch((err) => res.status(500).json({ error: err, msg:'Ups! no hemos podido borrar tu colaborador!'}));
};