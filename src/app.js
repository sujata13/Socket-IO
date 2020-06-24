const express = require('express')
const app = express();
const http = require('http').Server(app)





//set the template engine ejs
app.set('view engine', 'ejs')

//path to find the static content
app.use(express.static('public'))


//Routing function which denotes that whenever there is get request on the server,
//it must send the index.ejs file(which we will be creating later) in response.
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = http.listen(3000);

const io = require("socket.io")(server);

//listen on every connection
io.on('connect', (socket) => {               //Line1
	console.log('New user connected')

    //listen on new_message
    socket.on('new_message', (data) => {        //Line2
        //broadcast the new message
        io.sockets.emit('new_message', data);   //Line3
    })  
})
