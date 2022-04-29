const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const dishRouter = require('./routes/dishRouter')
const promoRouter = require('./routes/promoRouter')
const leaderRouter = require('./routes/leaderRouter')
const hostname = 'localhost'
const port = 3000

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/dishes', dishRouter)
// app.use('/dishes/:dishId', dishRouter) //Don't need this

app.use('/promotions', promoRouter)
// app.use('/promotions/:promoId', promoRouter) //Don't need this

app.use('/leaders', leaderRouter)
// app.use('/leaders/:leaderId', leaderRouter) //Don't need this

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><body><h1>This is an express server</h1></body></html>')
})

const server = http.createServer(app)
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})