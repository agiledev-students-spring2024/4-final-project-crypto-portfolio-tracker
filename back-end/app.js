// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object

module.exports = app

// da middleware
app.use('/login', (req, res, next) =>{
    console.log("this is da middleware running")
    next();
})

//ROUTES 
app.get('/', (req, res) => {
    res.send("We are on home!")
})

app.get('/login', (req, res) => {
    res.send("We are on login!")
})


app.listen(3000)
