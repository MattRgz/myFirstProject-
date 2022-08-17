const MyEquipmentController = require('../controllers/myequipment.controller')

module.exports = app =>{
    app.post('/api/myequipment',MyEquipmentController.createMyEquipment);
    app.get('/api/myequipment',MyEquipmentController.findMyEquipment);
    app.get('/api/myequipment/:id',MyEquipmentController.findOneMyEquipment);
    app.get('/api/myequipment/buscar/:equipmentSerialNumber',MyEquipmentController.findMyEquipmentBySerial);
    app.get('/api/myequipment/mantenimiento/:equipmentSerialNumber',MyEquipmentController.findMyEquipmentBySerial);
    app.put('/api/myequipment/:id',MyEquipmentController.updateMyEquipment);
    app.delete('/api/myequipment/:id',MyEquipmentController.deleteMyEquipment)
}