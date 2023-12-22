const app = require("express")();
const bodyParser = require("body-parser")

const hotelRouter = require("./hotel.router")

app.use(bodyParser.json())

const PORT = 4000;

app.use("/hotel",hotelRouter)


app.listen(PORT,()=>{
    console.log("request on port : "+PORT)
})


app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send("Internal Server Error");
});