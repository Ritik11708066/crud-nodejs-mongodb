const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const homeroute= require('./routes/home.js');

const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodecrud', {useNewUrlParser:true, useUnifiedTopology:true});
const db= mongoose.connection;

db.on('error', ()=>console.log('something went wrong to the database'));
db.once('open', ()=>{
    console.log('database has been connected successfully');
});



app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(homeroute);


app.listen(4000, ()=>{
    console.log('server running on port no 4000');
})