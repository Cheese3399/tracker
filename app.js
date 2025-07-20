const express = require("express");
const app = express();
const path = require("path");
const http = require("http");


const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

// set the view engine to ejs
app.set("view engine","ejs");

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location",{id: socket.id, ...data});
    })
    
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    })
});

// Render the index.ejs view
app.get('/', function (req, res){
    res.render("index");
})

server.listen(3000);