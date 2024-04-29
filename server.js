import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Messages from './dbMessages.js'
import Pusher from 'pusher'

// Seeting up configuration

const app = express()
const port = process.env.Port || 9000

// ENTER MONGO DATABASE LINK HERE
const connection_url = ''

const pusher = new Pusher({
    appId: "1174251",
    key: "1234",
    secret: "mysecretdecoderring",
    cluster: "api",
    useTLS: true
});

// Middleware?
app.use(express.json())
app.use(Cors())

// Configure Database
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifieldTopology: true
})

// Setup for API endpoints
const db = mongoose.connection
db.once("open", () => {
    console.log("Database has been Connected!")
    const messageCollection = db.collection("messagingSchema")
    const changeStream = myCollection.watch()

    changeStream.on('change', change => {
        console.log(change)

        if (change.operationType === "insert"){
            const messageDetails = change.fullDocument
            pusher.trigger("messages", "inserted", {
                user: messageDetails.user,
                message: messageDetails.message,
                timeStamp: messageDetails.timeStamp,
                received: messageDetails.received
            })
        }
        else{
            console.log('Error while triggering the Pushe!')
        }
    })
})

app.get("/", (req, res) => res.status(200).send("Hello there!"))

app.post('/messages/new', (req, res) => {
    const dbMessages = req.body

    Messages.create(dbMessages, (err, data) => {
        if (err){
            res.status (500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.get ('/messages/synx', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

// Listen
app.listen(port, () => console.log('Listening on localhost: ${posrt}'))