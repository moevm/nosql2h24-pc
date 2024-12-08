import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import {login} from "./controllers/AdminController.js";
import checkAuth from "./utils/checkAuth.js";
import {addComponent, getAll, getOne, update} from "./controllers/ComponentsController.js";
import path from 'path';
const app = express();
 
const isProduction = true;
const folder = isProduction? "dist": "_public";
 
const PORT = 4444;
const __dirname = import.meta.dirname;
mongoose.connect("mongodb://127.0.0.1:27017/build_pc")
	.then(() => console.log('DB ok'))
	.catch((err) => console.warn('DB error: ', err));
 
app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
	if (req.path.endsWith('.html')){
		return res.status(404).send('404 Not Found');
	}
	next();
})
app.use(express.static(__dirname + `/_front/${folder}`));
 
 
app.get('/', (req, res) => {
 
	if (req.query.id){
		res.sendFile(path.join(__dirname + `/_front/${folder}/component.html`))
	}else {
		res.sendFile(path.join(__dirname + `/_front/${folder}/components.html`));
	}
 
});
 
app.get('/login', (req, res) =>  {
	res.sendFile(path.join(__dirname + `/_front/${folder}/login.html`));
});
 
app.get('/add-edit', (req, res) => {
	res.sendFile(path.join(__dirname + `/_front/${folder}/add-edit.html`))
})
 
app.post('/auth/login', login);
 
 
app.post('/components', checkAuth, addComponent);
app.get('/components', getAll);
app.get('/components/:id', getOne);
app.patch('/components/:id', checkAuth, update);
app.get('/auth/authorized', checkAuth, (req, res) => {
	res.json({
		message: true
	})
});
 
app.listen(PORT, (err) => {
	if (err) {
		console.warn(err)
	} else {
		console.log(`Server successfully started at port ${PORT}`);
	}
});
 
/*
На данный момент
{
	"login": "admin",
	"password": "12345"
}
 */