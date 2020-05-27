const express = require('express')
require('express-async-errors')
const cookieSession = require('cookie-session')
const app = express()
require('./connect-db') //Establish connection to mongodb.
const cors = require('cors') // Needed for cross origin.
const port = 9000   //API server port.

const usersRouter = require('./routers/usersRouter')
const productsRouter = require('./routers/productsRouter')
const shippingRouter = require('./routers/shippingRouter')
const ordersRouter = require('./routers/ordersRouter')


const sessionRouter = require('./routers/sessionRouter')

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }))
app.use(cookieSession({
    secret: 'SuperSecretCode',
    maxAge: 1000 * 60 * 1, //1 min cookie timeout.
    sameSite: 'strict',
    httpOnly: true,
    secure: false
}))
app.use(express.json())

app.use("/api/users", usersRouter)
app.use("/api/products", productsRouter)
app.use("/api/shipping", shippingRouter)
app.use("/api/orders", ordersRouter)

app.use("/session", sessionRouter)

app.get('/', (req, res) => res.json({ someText: 'From express API! :9000!' }))
// app.use(errorNotFound) //Add 404 not found error.

app.use((req,res) => {
    res.status(404).json({msg: "Resource could not be found."})
})

app.use((err, req, res, next) => {
    const message = err.message || "Something went wrong."
    const statusCode = err.status || 500

    res.status(statusCode).json({message})
})


app.listen(port, () => console.log(`Server http://localhost:${port}`))