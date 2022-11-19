require('dotenv').config ()
const express = require ('express')
const fileUpload = require ('express-fileupload')
const cors = require ('cors')
const cookieParser = require ('cookie-parser')
const mongoose = require ('mongoose')

const posts = require ('./routes/posts')
const filter = require ('./routes/filter')
const authorization = require ('./routes/authorization')
const experts = require ('./routes/experts')
const comments = require ('./routes/comments')


const app = express ()
const PORT = process.env.PORT || 5000

app.use (express.json ())
app.use (cookieParser ())
app.use (cors ({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use (express.static ('src/static'))
app.use (fileUpload ())

app.use ('/api', authorization)
app.use ('/api', posts)
app.use ('/api', filter)
app.use ('/api', experts)
app.use ('/api', comments)


const start = async () => {
    try {
        await mongoose.connect (process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen (PORT, () => console. log (`Server started on ${PORT}`))
    } catch (e) {
        console. log (e)
    }
}

start ()