const {authenticate} = require('../config/jwt.config');
const {register, login, ingreso, logout} = require('../controllers/user.controller');

module.exports = app => {
    app.post('/api/users/register', register);
    app.post('/api/users/login', login);
    app.get('/api/users/ingreso', authenticate,ingreso);
    app.get("/api/users/logout", authenticate,logout);
}

