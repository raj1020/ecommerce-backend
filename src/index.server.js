const express = require ('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// mongodb+srv://Prad:<password>@cluster0.rxy5s.mongodb.net/<dbname>?retryWrites=true&w=majority

env.config();

mongoose.connect(
    'mongodb://localhost:27017/test', 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB connected');
    })


app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Hello! This is the server."
    });

})
app.post('/', (req, res, next) => {
    res.status(200).json({
        message: req.body
    });

})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}` );
})

