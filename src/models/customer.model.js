const mongoose = require('mongoose');
const db = mongoose.connection;

db.on('error', err=>{
	console.log(err);
});
db.once('open', ()=>{
	console.log('MongoDB connected');
})
mongoose.connect('mongodb://localhost:27017/NodeAPI');

const CustomerSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		required: true,
		unique: true
	}
});

const CustomerModel = module.exports = mongoose.model('Customer', CustomerSchema)