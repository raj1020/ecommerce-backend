const express = require ('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const authRoutes = require('./routes/auth');

env.config();




mongoose.connect(
    
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.fy8do.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
       
    }
)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => console.log(err))
;

app.use(bodyParser.json());
app.use('/api',authRoutes);

app.get('/', (req, res, next) => {
    res.status(200).json("Hello! This is the server.");

})
app.post('/', (req, res, next) => {
    res.status(200).json({
        message: req.body
    });

})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}` );
})

