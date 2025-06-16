const http = require("http")

const express = require("express")
const {Server} = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const userOnlone = {}

//midd
app.use(express.static("public"))


server.listen(3000, err => {
    if(err) console.log(err)
    else console.log("start")
})

io.on("connection", socket => {

    socket.on("disconnect", () => {
        delete userOnlone[socket.id]
        io.sockets.emit("listOnline", userOnlone)
    })

    socket.on("chat", data => {
        console.log(data)
        io.sockets.emit("chat", data)
    })
    
    socket.on("login", nickname => {
        userOnlone[socket.id] = nickname
        io.sockets.emit("listOnline", userOnlone)
    })
})