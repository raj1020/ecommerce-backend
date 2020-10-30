const express = require ('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');




env.config();




mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.rxy5s.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
        {
        useNewUrlParser: true, 
        useUnifiedTopology: true
       
    }
)
.then(() => {
    console.log('Connected to MongoDB');
})
;

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

