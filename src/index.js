const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const personRoute = require('./routes/person');
const customerRoute = require('./routes/customer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next)=>{
	console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
	//res.send('')
	next()
});


app.use(personRoute);
app.use(customerRoute);

app.use(express.static(path.join(__dirname, 'public')));


//Error 404 Handler
app.use((req, res, next)=>{
res.status(404).send('We think you are lost');
});

//Error 500 Handler
app.use((err, req, res, next)=>{
	console.error(err.stack);
	res.sendFile(path.join(__dirname, './public/500.html'))
});




const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
	console.log(`Server started on ${PORT}`);
})