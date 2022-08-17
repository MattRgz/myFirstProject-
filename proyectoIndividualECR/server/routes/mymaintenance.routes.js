const MyMaintenanceController = require('../controllers/mymaintenance.controller')



module.exports = app =>{
    app.get('/api',MyMaintenanceController.index);
    app.post('/api/mymaintenance',MyMaintenanceController.createMyMaintenance);
    app.get('/api/mymaintenance',MyMaintenanceController.findMyMaintenance);
    app.get('/api/mymaintenance/buscar/:maintenanceSerialNumber',MyMaintenanceController.findMyMaintenanceBySerial);
    app.get('/api/mymaintenance/:id',MyMaintenanceController.findOneMyMaintenance);
    app.put('/api/mymaintenance/:id',MyMaintenanceController.updateMyMaintenance);
    app.delete('/api/mymaintenance/:id',MyMaintenanceController.deleteMyMaintenance)
}

