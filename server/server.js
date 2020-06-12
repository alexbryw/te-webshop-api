const express = require('express')
require('express-async-errors')
const cookieSession = require('cookie-session')
const app = express()
require('./connect-db') //Establish connection to mongodb.
const cors = require('cors') // Needed for cross origin.
const port = 9000   //API server port.

const usersRouter = require('./routers/user.router')
const productsRouter = require('./routers/product.router')
const shippingRouter = require('./routers/shippingRouter')
const ordersRouter = require('./routers/ordersRouter')
const filesRouter = require('./routers/file.router')

const sessionRouter = require('./routers/session.router')


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use(cookieSession({
    name: 'LoginSession',
    secret: 'GuppE4Lyf3-1337',
    // maxAge: 24 * 60 * 60 * 1000, //24 hours
    // maxAge: 60 * 60 * 1000, //1 hour
    maxAge: 30 * 60 * 1000, //30 minutes
    // maxAge: 60 * 1000 * 5, //5 minute
    // maxAge: 60 * 1000, //1 minute
    // maxAge: 15 * 1000, //15 seconds
    // maxAge: 10 * 1000, //10 seconds
    // maxAge: 5 * 1000, //5 seconds
    sameSite: 'none',
    httpOnly: true,
    secure: false,
}))

app.use(express.json())

app.use("/api/users", usersRouter)
app.use("/api/products", productsRouter)
app.use("/api/shipping", shippingRouter)
app.use("/api/orders", ordersRouter)
app.use("/api/files", filesRouter)

app.use("/session", sessionRouter)

app.get('/', (req, res) => res.json({ someText: 'From express API! :9000!' }))

app.use((req, res) => {
    res.status(404).json({ 404: "Resource could not be found." })
})

//Global error.
app.use((err, req, res, next) => {
    const message = err.message || "Something went wrong."
    const statusCode = err.status || 500
    console.error(err)

    res.status(statusCode).json({ message })
})


app.listen(port, () => console.log(`Server http://localhost:${port}`))