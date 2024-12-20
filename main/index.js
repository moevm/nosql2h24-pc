import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import {login} from "./controllers/AdminController.js";
import checkAuth from "./utils/checkAuth.js";
import {
	addComponent,
	deleteElem,
	exportToClient,
	getAll,
	getOne,
	importFromClient,
	update
} from "./controllers/ComponentsController.js";
import path from 'path';
import ComponentsModel from "./models/Components.js";
import * as fs from "node:fs";
const app = express();
 
const isProduction = true;
const folder = isProduction? "dist": "_public";
const PORT = 4444;
const __dirname = import.meta.dirname;
mongoose.connect("mongodb://db:27017/build_my_data")
	.then(() => {
		console.log('DB ok')
		const components = ComponentsModel.find()
		ComponentsModel.find().limit(1)
			.then(data => {
				if (data.length === 0){
					const jsonData = JSON.parse(fs.readFileSync('./utils/data.json', 'utf-8'));
					const components = jsonData.components;
					for (const component of components){
						const doc = new ComponentsModel({
							name: component.name,
							type: component.type,
							price: component.price,
							count: component.count,
							main_properties: component.main_properties,
							other_properties: component.other_properties
						})
						doc.save()
							.then(() => {})
					}
				}
			})
	})
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

app.get('/admin', (req, res) => {
	res.sendFile(path.join(__dirname + `/_front/${folder}/admin.html`))
})

app.post('/auth/login', login);

app.get('/components/json', checkAuth, exportToClient);
app.post('/components/json', checkAuth, importFromClient);
app.post('/components', checkAuth, addComponent);
app.get('/components', getAll);
app.get('/components/:id', getOne);
app.patch('/components/:id', checkAuth, update);
app.delete('/components/:id', checkAuth, deleteElem);
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