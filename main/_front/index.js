import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import {login, register} from "./controllers/AdminController.js";
import checkAuth from "./utils/checkAuth.js";
const app = express();

const PORT = 4444;
const __dirname = import.meta.dirname;

mongoose.connect("mongodb://127.0.0.1:27017/build_pc")
	.then(() => console.log('DB ok'))
	.catch((err) => console.warn('DB error: ', err));

app.use(cors())
app.use(express.json());
app.use(express.static(__dirname + '/_front'));


app.get('/', (req, res) => {
	res.send("Hello world!");
});

app.post('/auth/register', register);

app.post('/auth/login', login);


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