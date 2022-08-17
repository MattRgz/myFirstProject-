const socket = require('socket.io');

const saludo = 'Saludos desde el server';

module.exports.socketsEvents = (server) =>{
    const io = socket(server, { cors: true});

    io.on("connection", socket => {
        console.log(socket.id);
        io.emit("from-server", saludo);
        socket.broadcast.emit("send_data_to_everyone",saludo);
    })
}