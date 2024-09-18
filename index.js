import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const PORT = 4444;
const __dirname = import.meta.dirname;

let db_ok = false;

mongoose.connect("mongodb://127.0.0.1:27017/computer_shop")
	.then(() => {
		console.log("DB ok")
		db_ok = true;
	})
	.catch((err) => console.warn("DB error: ", err));

app.use(cors())
app.use(express.json());
app.use(express.static(__dirname + '/front'));

app.get('/', (req, res) => {
	res.send("Hello world!");
});

app.get('/is_ok', (req, res) => {
	console.log("here");
	res.status(200).json({
		message: db_ok ? "DB ok": "DB is not ok"
	})
})

app.listen(PORT, (err) => {
	if (err) {
		console.warn(err)
	} else {
		console.log(`Server successfully started at port ${PORT}`);
	}
});