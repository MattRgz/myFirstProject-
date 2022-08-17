const MyColaboratorController = require('../controllers/mycolaborator.controller')



module.exports = app =>{
    app.get('/api',MyColaboratorController.index);
    app.post('/api/mycolaborator',MyColaboratorController.createMyColaborator);
    app.get('/api/mycolaborator',MyColaboratorController.findMyColaborator);
    app.get('/api/mycolaborator/:id',MyColaboratorController.findOneMyColaborator);
    app.put('/api/mycolaborator/:id',MyColaboratorController.updateMyColaborator);
    app.delete('/api/mycolaborator/:id',MyColaboratorController.deleteMyColaborator)
}

