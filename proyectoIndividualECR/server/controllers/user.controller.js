const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.register = async (req,res) => {
    try{
        const user = await User.create(req.body);
        return res.json({ user, msg: 'Se ha registrado de manera exitosa!'});
    }catch(err){
        return res.status(500).json({ msg: 'No hemos podido registrar el usuario!', error: err});
    }
}
module.exports.logout = async (_, res) => {
    try {
        return res.clearCookie("usertoken").json({msg:"token eliminado"})
    } catch (err){
        return res.status(403).json({msg:"usuario sin token", err})
    }
}

module.exports.login = async (req, res) => {
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(403).json({msg:'Email no corresponde a ninguno de nuestros usuarios'});
        }else{
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if(isValidPassword){
                const newJWT = jwt.sign({
                    _id:user._id,
                    name:user.name
                }, process.env.SECRET_KEY);
                return res
                    .cookie('usertoken', newJWT, process.env.SECRET_KEY,{httpOnly:true})
                    .json({
                        message:"Se ha logeado de manera exitosa"
                    });
            }else{
                return res.status(403).json({msg:'Contrasena Invalida'});
            }
        }
    }catch(err){
        return res.status(403).json({msg:'Credenciales invalidas',err})
    }
};

module.exports.ingreso = async (_,res) => {
    try{
        res.json({msg: 'Bienvenido!'})
    } catch(err){
        return res.status(403).json({msg: 'No tienes permisos', err})
    }
}