const MyContractController = require('../controllers/mycontract.controller')



module.exports = app =>{
    app.get('/api',MyContractController.index);
    app.post('/api/mycontract',MyContractController.createMyContract);
    app.get('/api/mycontract',MyContractController.findMyContract);
    app.get('/api/mycontract/buscar/:contractSerialNumber',MyContractController.findMyContractBySerial);
    app.get('/api/mycontract/:id',MyContractController.findOneMyContract);
    app.put('/api/mycontract/:id',MyContractController.updateMyContract);
    app.delete('/api/mycontract/:id',MyContractController.deleteMyContract)
}

