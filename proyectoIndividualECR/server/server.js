const express = require('express');
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser');
const {socketsEvents} = require('./controllers/socket.controller')
require('dotenv').config();


console.log(process.env.SECRET_KEY);
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); // origen del front

require('./config/mongoose.config');

app.use(express.json());
app.use(express.urlencoded({extended:true}))



require('./routes/mycontract.routes')(app);
require('./routes/myequipment.routes')(app);
require('./routes/mycolaborator.routes')(app);
require('./routes/mymaintenance.routes')(app);
require('./routes/user.routes')(app);


const server = app.listen(8080, () => console.log('Connected!'))

socketsEvents(server)