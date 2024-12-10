import AdminModel from "../models/Admin.js";
 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
export const register = async (req, res) => {
	try {
		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
 
		const doc = new AdminModel({
			login: req.body.login,
			passwordHash: hash
		})
		const admin = await doc.save();
		const token = jwt.sign({
			_id: admin._id,
		},
			'secret2314',
			{
				expiresIn: '30d',
			}
		);
		const {passwordHash, ...AdminData} = admin._doc;
 
		res.json({
			...AdminData,
			token
		});
	} catch (err) {
		res.status(500).json({
			message: "Не удалось авторизоваться"
		})
	}
}
 
export const login = async (req, res) => {
	try {
		const msg = "Неверный логин или пароль";
		let hasAdmin = true;
 
		await AdminModel.find()
			.then((docs) => {
				if (docs.length === 0) {
					hasAdmin = false;
				}
				console.log("first")
			})
		if (!hasAdmin) {
			const password = "12345";
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
 
			const doc = new AdminModel({
				login: "admin",
				passwordHash: hash
			})
			await doc.save();
		}
		console.log("second")
		const admin = await AdminModel.findOne({login: req.body.login});
		if (!admin) {
			return res.status(404).json({
				message: msg
			})
		}
		// Если отсюда убрать await, то, зная логин, можно войти с любым паролем! Лол)
		const isValidPassword = await bcrypt.compare(req.body.password, admin._doc.passwordHash);
		if (!isValidPassword) {
			return res.status(404).json({
				message: msg
			})
		}
		const token = jwt.sign({
			_id: admin._id,
		},
			'secret2314',
			{
				expiresIn: '30d',
		});
		const { passwordHash, ...AdminData } = admin._doc;
		res.json({
			...AdminData,
			token
		});
	}catch (err) {
		console.warn(err);
		res.status(500).json({
			message: "Не удалось авторизоваться"
		})
	}
}